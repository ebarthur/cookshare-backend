import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { SkipThrottle } from '@nestjs/throttler'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { ReqUser, ReqUserType } from './../../auth/utils/user.decorator'
import { ActiveSaveDto } from './dto/active-save.dto'
import { UserSaveDto } from './dto/user-save.dto'
import { SavesService } from './saves.service'

@ApiTags('saves')
@Controller('saves')
export class SavesController {
  logger: Logger

  constructor(private readonly savesService: SavesService) {
    this.logger = new Logger()
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('user-saves')
  async getUserSaves(@ReqUser() user: ReqUserType): Promise<UserSaveDto[]> {
    return this.savesService.getUserSaves(user.userId.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @SkipThrottle()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  })
  @Post('recipe-user-save')
  async getRecipeUserSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.getRecipeUserSave(id, user.userId.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  })
  @Post('update-save')
  async updateSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.updateSave(id, user.userId.id)
  }
}
