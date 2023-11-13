import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // create(createImageDto: CreateImageDto) {
  //   return 'This action adds a new image';
  // }

  // findAll() {
  //   return `This action returns all image`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} image`;
  // }

  async upload(request: express.Request, file: Express.Multer.File): Promise<string> {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const uploadImageUrl = `${userServiceUrl}/images/upload`;
    const jwtToken = request.headers.authorization;
    const headers = {
      Authorization: jwtToken,
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    const uploadImage = new Blob([file.buffer], { type: file.mimetype });
    formData.append('image', uploadImage, file.originalname);
    
    return lastValueFrom(this.httpService
      .post(uploadImageUrl, formData, {headers})
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      ));
  }

  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
