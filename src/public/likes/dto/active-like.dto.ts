import { Dto } from 'src/lib/dto/Dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ActiveLikeDto extends Dto<ActiveLikeDto> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  recipeId: number

  @ApiProperty()
  @IsNotEmpty()
  deleted_at: Date
}
