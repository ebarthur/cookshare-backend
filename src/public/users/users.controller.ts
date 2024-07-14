import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { ReqUser, ReqUserType } from 'src/auth/utils/user.decorator'
import { AuthUserDto } from './dto/auth-user.dto'
import { UserProfileDto } from './dto/user-profile.dto'
import { FollowDto } from './dto/follow.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   // TODO: Define return type
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard)
  // @Post('profile/:id')
  // async getProfileAndRecipes(@Param('id') id: string) {
  //   return this.usersService.getProfileAndRecipes(id)
  // }

  @ApiBearerAuth() 
  @UseGuards(JwtGuard)
  @Post('username/:username')
  async updateUsername(@Param('username') username: string, @ReqUser() user: ReqUserType) {
    return await this.usersService.updateUsername(username, user.userId.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('firstname/:firstname')
  async updateFirstname(
    @Param('firstname') firstname: string,
    @ReqUser() user: ReqUserType,
  ): Promise<AuthUserDto> {
    return this.usersService.updateFirstname(firstname, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('user')
  async getUser(@ReqUser() user: ReqUserType): Promise<AuthUserDto> {
    return this.usersService.getUser(user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('follow/:id')
  async followUser(@Param('id') id: string, @ReqUser() user: ReqUserType): Promise<FollowDto> {
    return this.usersService.followUser(id, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('follow-status/:id')
  async getFollowStatus(
    @Param('id') id: string,
    @ReqUser() user: ReqUserType,
  ): Promise<boolean> {
    return this.usersService.getFollowStatus(id, user.userId.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update-user-avatar')
  async updateUserAvatar(
    @Body() { avatar }: { avatar: string },
    @ReqUser() user: ReqUserType,
  ) {
    return this.usersService.updateUserAvatar(avatar, user.userId.id);
  }
}

