import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class ChangeBioDto extends Dto<ChangeBioDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bio: string
}
