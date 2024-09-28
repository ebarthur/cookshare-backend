import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard'
import { ReqUser, ReqUserType } from 'src/auth/utils/user.decorator'
import { UploadDto } from './dto/upload.dto'
import { UploadService } from './upload.service'

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  async uploadFiles(
    @ReqUser() user: ReqUserType,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    return await this.uploadService.upload(files, user.userId.id)
  }
}
