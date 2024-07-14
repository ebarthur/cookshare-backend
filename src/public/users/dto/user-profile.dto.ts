import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UserProfileDto {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  firstname: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string

  @ApiProperty()
  @IsNumber()
  followers: number

  @ApiProperty()
  @IsNumber()
  following: number

  // @ApiProperty({})
  // recipes:
}
