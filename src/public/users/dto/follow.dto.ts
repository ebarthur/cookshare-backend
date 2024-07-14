import { Dto } from 'src/lib/dto/Dto'

export class FollowDto extends Dto<FollowDto> {
  id: number
  followerId: string
  followingId: string
  deleted_at: Date
  created_at: Date
  updated_at: Date
}
