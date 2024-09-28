import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { SearchController } from './search.controller'
import { SearchService } from './search.service'

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [PrismaModule],
})
export class SearchModule {}
