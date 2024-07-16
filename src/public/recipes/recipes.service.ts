import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryDto } from './dto/category.dto'
import { RecipeDto } from './dto/recipe.dto'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { ProfileDto } from '../users/dto/profile.dto'

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async getAllRecipes() {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        user: true,
        category: true,
      },
      orderBy: {
        created_at: 'desc',
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
          tags: e.tags,
          images: e.images,
          user: {
            firstname: e.user.firstname,
            id: e.user.id,
            username: e.user.username,
            avatar: e.user.avatar,
          },
          createdAt: e.created_at,
        }),
    )
  }

  async getRecipeById(recipeId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        user: true,
        category: true,
      },
    })

    if (!recipe) {
      throw new NotFoundException('Recipe not found')
    }

    return new RecipeDto({
      id: recipe.id,
      content: recipe.content,
      category: new CategoryDto({
        id: recipe.category.id,
        name: recipe.category.name,
      }),
      tags: recipe.tags,

      images: recipe.images,
      user: {
        firstname: recipe.user.firstname,
        id: recipe.user.id,
        username: recipe.user.username,
        avatar: recipe.user.avatar,
      },
      createdAt: recipe.created_at,
    })
  }

  async getFollowingRecipes(userId: string) {
    const following = await this.prisma.follower.findMany({
      where: {
        followerId: userId,
        deleted_at: null,
      },
    })

    const recipes = await this.prisma.recipe.findMany({
      where: {
        userId: {
          in: following.map((e) => e.followingId),
        },
        deleted_at: null,
      },
      include: {
        user: true,
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return recipes.map(
      (recipe) =>
        new RecipeDto({
          id: recipe.id,
          content: recipe.content,
          category: new CategoryDto({
            id: recipe.category.id,
            name: recipe.category.name,
          }),
          tags: recipe.tags,
          images: recipe.images,
          user: {
            firstname: recipe.user.firstname,
            id: recipe.user.id,
            username: recipe.user.username,
            avatar: recipe.user.avatar,
          },
          createdAt: recipe.created_at,
        }),
    )
  }

  async createRecipe(userId: string, createRecipeDto: CreateRecipeDto) {
    const { content, categoryId, images, tags } = createRecipeDto

    if (!content) {
      throw new PreconditionFailedException('Missing content')
    }

    if (!categoryId) {
      throw new PreconditionFailedException('Missing category id')
    }

    if (!images) {
      throw new PreconditionFailedException('Missing images')
    }

    if (!tags) {
      throw new PreconditionFailedException('Missing tags')
    }

    if (!userId) {
      throw new PreconditionFailedException('Missing user id')
    }

    const newRecipe = await this.prisma.recipe.create({
      data: {
        content,
        category: {
          connect: {
            id: categoryId,
          },
        },
        images,
        user: {
          connect: {
            id: userId,
          },
        },
        tags,
      },
      include: {
        category: true,
        user: true,
      },
    })

    if (!newRecipe) {
      throw new NotFoundException('Could not create new Recipe')
    }

    return new RecipeDto({
      id: newRecipe.id,
      images: newRecipe.images,
      content: newRecipe.content,
      createdAt: newRecipe.created_at,
      category: new CategoryDto({
        id: newRecipe.category.id,
        name: newRecipe.category.name,
      }),
      tags: newRecipe.tags,
      user: new ProfileDto({
        id: newRecipe.user.id,
        firstname: newRecipe.user.firstname,
        username: newRecipe.user.username,
        avatar: newRecipe.user.avatar,
      }),
    })
  }

  async getAllCategories(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Missing user id')
    }

    const categories = await this.prisma.category.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        id: 'asc',
      },
    })

    return categories.map(
      (e) =>
        new CategoryDto({
          id: e.id,
          name: e.name,
        }),
    )
  }
}
