import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
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
    const response = await firstValueFrom(
      this.httpService.post(creatUserUrl, createUserDto)
    );
    return response.data
  }

  async findAll() {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const findAllUserUrl = `${userServiceUrl}/users`;
    const response = await firstValueFrom(
      this.httpService.get(findAllUserUrl)
    );
    return response.data
  }

  async findOne(id: number) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const findOneUserUrl = `${userServiceUrl}/users/${id}`;
    const response = await firstValueFrom(
      this.httpService.get(findOneUserUrl)
    );
    return response.data
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const updateUserUrl = `${userServiceUrl}/users/${id}`;
    const response = await firstValueFrom(
      this.httpService.patch(updateUserUrl, updateUserDto)
    );
    return response.data
  }

  async remove(id: number) {
    const userServiceUrl = this.configService.get<string>('USER_SERVICE_URL');
    const removeUserUrl = `${userServiceUrl}/users/${id}`;
    const response = await firstValueFrom(
      this.httpService.delete(removeUserUrl)
    );
    return response.data
  }
}
