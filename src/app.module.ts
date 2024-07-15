import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './public/users/users.module'
import { AuthModule } from './auth/auth.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
