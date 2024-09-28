import { Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { RecipeDto } from '../recipes/dto/recipe.dto'
import { ProfileDto } from '../users/dto/profile.dto'
import { SearchService } from './search.service'

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('profiles/:query')
  async search(@Param('query') query: string): Promise<ProfileDto[]> {
    return this.searchService.searchProfiles(query)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('recipes/:query')
  async searchRecipes(@Param('query') query: string): Promise<RecipeDto[]> {
    return this.searchService.searchRecipes(query)
  }
}
