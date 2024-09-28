import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { SavesController } from './saves.controller'
import { SavesService } from './saves.service'

@Module({
  controllers: [SavesController],
  providers: [SavesService],
  imports: [PrismaModule],
})
export class SavesModule {}
