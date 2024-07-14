import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersService } from 'src/public/users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
})
export class AuthModule {}
