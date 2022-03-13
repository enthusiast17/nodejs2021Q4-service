import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (
          _req,
          file: Express.Multer.File,
          cb: (error: Error, filename: string) => void,
        ) => {
          cb(
            null,
            `${new Date().toISOString().replace(/:|\./g, '')}-${
              file.originalname
            }`,
          );
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException();
    }

    return {
      createdEndpoint: `file/${file.filename}`,
      message: 'File uploaded!',
    };
  }

  @Get(':filename')
  async findOne(@Res() res: Response, @Param('filename') filename: string) {
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    const filestream = createReadStream('files/' + filename);
    filestream.pipe(res);
  }
}
