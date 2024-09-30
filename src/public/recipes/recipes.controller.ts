import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { ReqUser, ReqUserType } from 'src/auth/utils/user.decorator'
import { CategoryDto } from './dto/category.dto'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeDto } from './dto/recipe.dto'
import { RecipesService } from './recipes.service'

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  logger: Logger
  constructor(private readonly recipesService: RecipesService) {
    this.logger = new Logger()
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('all')
  async allRecipes(): Promise<RecipeDto[]> {
    return this.recipesService.getAllRecipes()
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('following')
  async followingFinds(@ReqUser() user: ReqUserType): Promise<RecipeDto[]> {
    return this.recipesService.getFollowingRecipes(user.userId.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  })
  @Post('recipe')
  async getRecipeById(@Body() { id }: { id: number }): Promise<RecipeDto> {
    return this.recipesService.getRecipeById(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async createRecipe(
    @ReqUser() user: ReqUserType,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipesService.createRecipe(user.userId.id, createRecipeDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('categories')
  async getAllCategories(@ReqUser() user: ReqUserType): Promise<CategoryDto[]> {
    return this.recipesService.getAllCategories(user.userId.id)
  }
}
