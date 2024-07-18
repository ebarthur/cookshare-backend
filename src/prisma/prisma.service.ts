import {
  Injectable,
  OnModuleInit,
  PreconditionFailedException,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect()
    } catch {
      throw new Error('Failed to connect to DB')
    }
  }
}
