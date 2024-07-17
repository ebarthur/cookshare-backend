import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { SavesService } from './saves.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser, ReqUserType } from './../../auth/utils/user.decorator';
import { UserSaveDto } from './dto/userSave.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveSaveDto } from './dto/activeSave.dto';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('saves')
@Controller('saves')
export class SavesController {
  logger: Logger;

  constructor(private readonly savesService: SavesService) {
    this.logger = new Logger();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('user-saves')
  async getUserSaves(@ReqUser() user: ReqUserType): Promise<UserSaveDto[]> {
    return this.savesService.getUserSaves(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @SkipThrottle()
  @Post('recipe-user-save')
  async getRecipeUserSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.getRecipeUserSave(id, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update-save')
  async updateSave(
    @ReqUser() user: ReqUserType,
    @Body() { id }: { id: number },
  ): Promise<ActiveSaveDto> {
    return this.savesService.updateSave(id, user.userId.id);
  }
}
