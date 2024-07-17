import {
  Controller,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { RecipeDto } from './dto/recipe.dto'
import { ReqUser, ReqUserType } from 'src/auth/utils/user.decorator'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { CategoryDto } from './dto/category.dto'

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
    return this.recipesService.getFollowingRecipes(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('recipe')
  async getRecipeById(@Body() { id }: { id: string }): Promise<RecipeDto> {
    return this.recipesService.getRecipeById(Number(id));
  }

  
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async createRecipe(
    @ReqUser() user: ReqUserType,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipesService.createRecipe(user.userId.id, createRecipeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('categories')
  async getAllCategories(@ReqUser() user: ReqUserType): Promise<CategoryDto[]> {
    return this.recipesService.getAllCategories(user.userId.id);
  }
}
