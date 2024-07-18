import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqUser, ReqUserType } from 'src/auth/utils/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(
    @ReqUser() user: ReqUserType,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return await this.uploadService.upload(files, user.userId.id);
  }
}