import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class LoginDto extends Dto<LoginDto> {
  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}
