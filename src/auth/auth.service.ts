import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/public/users/users.service'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/public/users/dto/create-user.dto'
import { AuthUserDto } from 'src/public/users/dto/auth-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new NotFoundException('Invalid credentials')
    }

    const userCredential = await this.prisma.authCredential.findUnique({
      where: { userId: user.id },
    })

    if (!userCredential) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      userCredential.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const authUser = new AuthUserDto({
      id: user.id,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    })

    const token = {
      sub: user.id,
      username: user.username,
    }

    return new LoginResponseDto({
      user: authUser,
      accessToken: this.jwtService.sign(token),
    })
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data)

    if (user.id) {
      return this.login(data)
    }
  }
}
