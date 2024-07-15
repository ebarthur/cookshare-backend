import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class ChangeAvatarDto extends Dto<ChangeAvatarDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string
}
