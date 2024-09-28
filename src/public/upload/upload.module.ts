import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [PrismaModule],
})
export class UploadModule {}
