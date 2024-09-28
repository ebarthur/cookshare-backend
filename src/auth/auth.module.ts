import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersService } from 'src/public/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
})
export class AuthModule {}
