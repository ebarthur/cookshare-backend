import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { LikesModule } from './public/likes/likes.module'
import { RecipesModule } from './public/recipes/recipes.module'
import { SavesModule } from './public/saves/saves.module'
import { SearchModule } from './public/search/search.module'
import { UploadModule } from './public/upload/upload.module'
import { UsersModule } from './public/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    PrismaModule,
    UsersModule,
    AuthModule,
    RecipesModule,
    SavesModule,
    LikesModule,
    SearchModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
