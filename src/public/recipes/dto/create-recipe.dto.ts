import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class CreateRecipeDto extends Dto<CreateRecipeDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  images: string[]

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  tags: string[]
}
