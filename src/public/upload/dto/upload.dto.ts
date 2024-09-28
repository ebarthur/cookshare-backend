import { ApiProperty } from '@nestjs/swagger'
import { Dto } from 'src/lib/dto/Dto'

export class UploadDto extends Dto<UploadDto> {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: Express.Multer.File[]
}
