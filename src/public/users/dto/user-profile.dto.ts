import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'
import { RecipeDto } from 'src/public/recipes/dto/recipe.dto'

export class UserProfileDto extends Dto<UserProfileDto> {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  firstname: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string

  @ApiProperty()
  @IsNumber()
  followers: number

  @ApiProperty()
  @IsNumber()
  following: number

  @ApiProperty({ type: [RecipeDto] })
  recipes: RecipeDto[]
}
