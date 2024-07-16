import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { AuthUserDto } from './dto/auth-user.dto'
import { FollowDto } from './dto/follow.dto'
import { ProfileDto } from './dto/profile.dto'
import { ChangeAvatarDto } from './dto/change-avatar.dto'
import { UserProfileDto } from './dto/user-profile.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    })

    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
      },
      select: { id: true },
    })

    await this.prisma.authCredential.create({
      data: {
        password: await bcrypt.hash(data.password, process.env.ROUNDS || 10),
        userId: user.id,
      },
    })

    return user
  }

  async getProfileAndRecipes(userId: string) {
    const profile = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        followers: true,
        following: true,
        recipes: {
          include: {
            category: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    })

    if (!profile) {
      return null
    }

    return new UserProfileDto({
      id: profile.id,
      username: profile.username,
      avatar: profile.avatar,
      firstname: profile.firstname,
      followers: profile.followers.length,
      following: profile.following.length,
      bio: profile.bio,
      recipes: profile.recipes.map((recipe) => ({
        id: recipe.id,
        createdAt: recipe.created_at,
        images: recipe.images,
        tags: recipe.tags,
        content: recipe.content,
        category: {
          id: recipe.category.id,
          name: recipe.category.name,
        },
        user: {
          firstname: profile.firstname,
          id: profile.id,
          username: profile.username,
          avatar: profile.avatar,
        },
      })),
    })
  }

  async updateUsername(username: string, userId: string) {
    if (username.length < 3) {
      throw new ConflictException('Username must be at least 3 characters')
    }

    if (username.length > 15) {
      throw new ConflictException('Username must be at most 15 characters')
    }

    if (!/^[a-zA-Z0-9_.-]*$/.test(username)) {
      throw new ConflictException(
        'Username can only contain letters, numbers, underscores, dashes and dots',
      )
    }

    const usernameTaken = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!!usernameTaken && usernameTaken.id !== userId) {
      throw new ConflictException('Username already taken')
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    })

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    })
  }

  async updateFirstname(
    firstname: string,
    userId: string,
  ): Promise<AuthUserDto> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstname,
      },
    })

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    })
  }

  async getUser(userId: string): Promise<AuthUserDto> {
    if (!userId) {
      throw new NotFoundException('User not found')
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return new AuthUserDto({
      email: user.email,
      firstname: user.firstname,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    })
  }

  async followUser(userId: string, followerId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }
    if (userId === followerId) {
      throw new ConflictException('You cannot follow yourself :/')
    }

    const follower = await this.prisma.user.findUnique({
      where: {
        id: followerId,
      },
    })

    if (!follower) {
      throw new NotFoundException('Follower not found')
    }

    const existingRecord = await this.prisma.follower.findFirst({
      where: {
        followerId: followerId,
        followingId: userId,
      },
    })

    if (existingRecord) {
      if (existingRecord.deleted_at) {
        const res = await this.prisma.follower.update({
          where: {
            id: existingRecord.id,
          },
          data: {
            deleted_at: null,
          },
        })

        return new FollowDto({
          id: res.id,
          followerId: res.followerId,
          followingId: res.followingId,
          created_at: res.created_at,
          deleted_at: res.deleted_at,
          updated_at: res.updated_at,
        })
      } else {
        const res = await this.prisma.follower.update({
          where: {
            id: existingRecord.id,
          },
          data: {
            deleted_at: new Date(),
          },
        })

        return new FollowDto({
          id: res.id,
          followerId: res.followerId,
          followingId: res.followingId,
          created_at: res.created_at,
          deleted_at: res.deleted_at,
          updated_at: res.updated_at,
        })
      }
    } else {
      const res = await this.prisma.follower.create({
        data: {
          followingId: userId,
          followerId: followerId,
        },
      })

      return new FollowDto({
        id: res.id,
        followerId: res.followerId,
        followingId: res.followingId,
        created_at: res.created_at,
        deleted_at: res.deleted_at,
        updated_at: res.updated_at,
      })
    }
  }

  async getFollowStatus(userId: string, followerId: string) {
    const existingRecord = await this.prisma.follower.findFirst({
      where: {
        followerId: followerId,
        followingId: userId,
      },
    })

    if (existingRecord) {
      if (existingRecord.deleted_at) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  async updateUserAvatar(data: ChangeAvatarDto, userId: string) {
    const res = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    })

    return new ProfileDto({
      id: res.id,
      firstname: res.firstname,
      username: res.username,
      avatar: res.avatar,
    })
  }
}
