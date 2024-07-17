import { Module } from '@nestjs/common'
import { SavesService } from './saves.service'
import { SavesController } from './saves.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [SavesController],
  providers: [SavesService],
  imports: [PrismaModule],
})
export class SavesModule {}
