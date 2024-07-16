import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'
import { ProfileDto } from 'src/public/users/dto/profile.dto'
import { CategoryDto } from './category.dto'

export class RecipeDto extends Dto<RecipeDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ type: CategoryDto })
  @IsNotEmpty()
  category: CategoryDto

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[]

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  tags: string[]

  @ApiProperty()
  @IsNotEmpty()
  user: ProfileDto

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date
}
