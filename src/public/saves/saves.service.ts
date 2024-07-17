import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserSaveDto } from './dto/userSave.dto'
import { CategoryDto } from '../recipes/dto/category.dto'
import { ActiveSaveDto } from './dto/activeSave.dto'
import { UserProfileDto } from '../users/dto/user-profile.dto'
import { ProfileDto } from '../users/dto/profile.dto'

@Injectable()
export class SavesService {
  constructor(private prisma: PrismaService) {}

  async getUserSaves(userId: string) {
    const saves = await this.prisma.save.findMany({
      where: {
        userId,
        deleted_at: null,
      },
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        recipes: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    })

    return saves.map(
      (save) =>
        new UserSaveDto({
          id: save.id,
          created_at: save.created_at,
          recipe: {
            id: save.recipes.id,
            createdAt: save.recipes.created_at,
            images: save.recipes.images,
            category: new CategoryDto({
              id: save.recipes.category.id,
              name: save.recipes.category.name,
            }),
            content: save.recipes.content,
            tags: save.recipes.tags,
            user: new ProfileDto({
              id: save.recipes.user.id,
              firstname: save.recipes.user.firstname,
              username: save.recipes.user.username,
              avatar: save.recipes.user.avatar,
            }),
          },
        }),
    )
  }

  async getRecipeUserSave(recipeId: number, userId: string) {
    const save = await this.prisma.save.findFirst({
      where: {
        recipes: {
          id: recipeId,
        },
        user: {
          id: userId,
        },
      },
    })

    if (!save) {
      return null
    }

    return new ActiveSaveDto({
      id: save.id,
      userId: save.userId,
      recipeId: save.recipeId,
      deleted_at: save.deleted_at,
    })
  }

  async updateSave(recipeId: number, userId: string) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    const existingSave = await this.prisma.save.findFirst({
      where: {
        recipeId,
        userId,
      },
    })

    if (existingSave) {
      // Save already exists, update deletedAt to null
      const save = await this.prisma.save.update({
        where: {
          id: existingSave.id,
        },
        data: {
          deleted_at: existingSave.deleted_at === null ? new Date() : null,
        },
      })

      return new ActiveSaveDto({
        id: save.id,
        userId: save.userId,
        recipeId: save.recipeId,
        deleted_at: existingSave.deleted_at === null ? new Date() : null,
      })
    } else {
      // Save doesn't exist, add a new record
      const save = await this.prisma.save.create({
        data: {
          userId,
          recipeId,
        },
      })

      return new ActiveSaveDto({
        id: save.id,
        userId: save.userId,
        recipeId: save.recipeId,
        deleted_at: save.deleted_at,
      })
    }
  }
}
