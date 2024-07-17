import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserLikeDto } from './dto/user-like.dto'
import { CategoryDto } from '../recipes/dto/category.dto'
import { ActiveLikeDto } from './dto/active-like.dto'
import { ProfileDto } from '../users/dto/profile.dto'

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async getUserLikes(userId: string) {
    const likes = await this.prisma.like.findMany({
      where: {
        userId,
        deleted_at: null,
      },
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        recipe: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    })

    return likes.map(
      (like) =>
        new UserLikeDto({
          id: like.id,
          created_at: like.created_at,
          recipe: {
            id: like.recipe.id,
            createdAt: like.recipe.created_at,
            images: like.recipe.images,
            category: new CategoryDto({
              id: like.recipe.category.id,
              name: like.recipe.category.name,
            }),
            content: like.recipe.content,
            tags: like.recipe.tags,
            user: new ProfileDto({
              id: like.recipe.user.id,
              firstname: like.recipe.user.firstname,
              username: like.recipe.user.username,
              avatar: like.recipe.user.avatar,
            }),
          },
        }),
    )
  }

  async getRecipeUserLike(recipeId: number, userId: string) {
    const like = await this.prisma.like.findFirst({
      where: {
        recipe: {
          id: recipeId,
        },
        user: {
          id: userId,
        },
      },
    })

    if (!like) {
      return null
    }

    return new ActiveLikeDto({
      id: like.id,
      userId: like.userId,
      recipeId: like.recipeId,
      deleted_at: like.deleted_at,
    })
  }

  async updateLike(recipeId: number, userId: string) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    const existingLike = await this.prisma.like.findFirst({
      where: {
        recipeId,
        userId,
      },
    })

    if (existingLike) {
      // Like already exists, update deletedAt to null
      const like = await this.prisma.like.update({
        where: {
          id: existingLike.id,
        },
        data: {
          deleted_at: existingLike.deleted_at === null ? new Date() : null,
        },
      })

      return new ActiveLikeDto({
        id: like.id,
        userId: like.userId,
        recipeId: like.recipeId,
        deleted_at: existingLike.deleted_at === null ? new Date() : null,
      })
    } else {
      // Like doesn't exist, add a new record
      const like = await this.prisma.like.create({
        data: {
          userId,
          recipeId,
        },
      })

      return new ActiveLikeDto({
        id: like.id,
        userId: like.userId,
        recipeId: like.recipeId,
        deleted_at: like.deleted_at,
      })
    }
  }
}
