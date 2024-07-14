import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'

export class AuthCredentialsDto extends Dto<AuthCredentialsDto> {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  password: string
}
