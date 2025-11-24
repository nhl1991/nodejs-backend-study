import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file-upload')
  // FileIntercepter(폼 필드 이름, {저장 경로, 허용 파일 형식, 파일명 변경 여부, 파일 크기 제한}) multer에서 제공하는 옵션.
  @UseInterceptors(FileInterceptor('file', multerOption)) //　파일 인터셉터

  fileUpload(@UploadedFile() file: Express.Multer.File){

    return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`
  }
}
