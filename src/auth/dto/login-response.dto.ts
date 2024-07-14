import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Dto } from 'src/lib/dto/Dto'
import { AuthUserDto } from 'src/public/users/dto/auth-user.dto'

export class LoginResponseDto extends Dto<LoginResponseDto> {
  @ApiProperty()
  @IsString()
  accessToken: string

  @ApiProperty({ type: AuthUserDto })
  @IsString()
  user: AuthUserDto
}
