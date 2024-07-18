import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './public/users/users.module'
import { AuthModule } from './auth/auth.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { RecipesModule } from './public/recipes/recipes.module'
import { SavesModule } from './public/saves/saves.module'
import { LikesModule } from './public/likes/likes.module'
import { SearchModule } from './public/search/search.module';
import { UploadModule } from './public/upload/upload.module';

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
