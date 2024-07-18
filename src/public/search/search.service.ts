import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProfileDto } from '../users/dto/profile.dto'
import { RecipeDto } from '../recipes/dto/recipe.dto'
import { CategoryDto } from '../recipes/dto/category.dto'

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchProfiles(query: string) {
    const profiles = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query } },
          { firstname: { contains: query } },
        ],
        AND: [
          {
            username: {
              not: null,
            },
            deleted_at: {
              equals: null,
            },
          },
        ],
      },
    })

    return profiles.map(
      (profile) =>
        new ProfileDto({
          id: profile.id,
          firstname: profile.firstname,
          username: profile.username,
          avatar: profile.avatar,
        }),
    )
  }
  async searchRecipes(query: string) {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        OR: [
          { content: { contains: query } },
          { tags: { has: query } },
          { category: { name: { contains: query } } },
        ],
        AND: [
          {
            deleted_at: {
              equals: null,
            },
          },
        ],
      },
      include: {
        category: true,
        user: true,
      },
    })

    return recipes.map(
      (e) =>
        new RecipeDto({
          id: e.id,
          content: e.content,
          category: new CategoryDto({
            id: e.category.id,
            name: e.category.name,
          }),
          images: e.images,
          tags: e.tags,
          user: new ProfileDto({
            id: e.user.id,
            username: e.user.username,
            firstname: e.user.firstname,
            avatar: e.user.avatar,
          }),
          createdAt: e.created_at,
        }),
    )
  }
}
