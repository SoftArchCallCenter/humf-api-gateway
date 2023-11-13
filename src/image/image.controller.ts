import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as express from 'express';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   console.log('createImageDto', createImageDto)
  //   return this.imageService.create(createImageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.imageService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imageService.findOne(+id);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async upload(@Req() request: express.Request, @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
      // console.log(file);
      const url = await this.imageService.upload(request,file);
      return { url };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imageService.remove(+id);
  // }
}