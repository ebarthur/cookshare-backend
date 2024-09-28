import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/public/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data)
  }

  @Post('register')
  async registerUser(@Body() data: CreateUserDto) {
    return await this.authService.createUser(data)
  }
}
