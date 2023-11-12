import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import * as express from 'express';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class UsersService {
  constructor( 
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const creatUserUrl = `${userServiceUrl}/users`;
    return this.httpService
      .post(creatUserUrl, createUserDto)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async findAll(request: express.Request): Promise<any>  {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const findAllUserUrl = `${userServiceUrl}/users`;
    const jwtToken = request.headers.authorization;
    const headers = {
      Authorization: jwtToken,
    };
    console.log(headers)

    return this.httpService
      .get(findAllUserUrl, {headers})
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async findOne(id: number, request: express.Request): Promise<any> {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const findOneUserUrl = `${userServiceUrl}/users/${id}`;
    const jwtToken = request.headers.authorization;
    const headers = {
      Authorization: jwtToken,
    };
    console.log(headers)
    return this.httpService
      .get(findOneUserUrl, {headers})
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const updateUserUrl = `${userServiceUrl}/users/${id}`;
    return this.httpService
      .patch(updateUserUrl, updateUserDto)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async remove(id: number) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const removeUserUrl = `${userServiceUrl}/users/${id}`;
    const response = await firstValueFrom(
      this.httpService.delete(removeUserUrl)
    );
    return this.httpService
      .delete(removeUserUrl)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }
}
