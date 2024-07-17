import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class ActiveSaveDto extends Dto<ActiveSaveDto> {
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
