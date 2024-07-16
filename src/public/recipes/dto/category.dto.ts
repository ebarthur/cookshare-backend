import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class CategoryDto extends Dto<CategoryDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
}
