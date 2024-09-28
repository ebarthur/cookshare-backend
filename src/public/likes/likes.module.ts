import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { LikesController } from './likes.controller'
import { LikesService } from './likes.service'

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [PrismaModule],
})
export class LikesModule {}
