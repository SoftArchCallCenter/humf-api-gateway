import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class OrderService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    const createOrderUrl = `${orderServiceUrl}/order`;
    
    return this.httpService
      .post(createOrderUrl, createOrderDto)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  async findByUser(userId: string) {
    const orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    const findByUserOrderUrl = `${orderServiceUrl}/order/user/${userId}`;
    console.log(findByUserOrderUrl);
    
    return this.httpService
      .get(findByUserOrderUrl)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  findByRestaurant(resId: string) {
    const orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    const findByRestaurantOrderUrl = `${orderServiceUrl}/order/res/${resId}`;
    return this.httpService
      .get(findByRestaurantOrderUrl)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  findOne(id: string) {
    const orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    const findOneOrderUrl = `${orderServiceUrl}/order/${id}`;
    return this.httpService
      .get(findOneOrderUrl)
      .pipe(map((resp) => resp.data))
      .pipe(
        catchError((error: AxiosError) => {
          const errorMessage =
            error.response?.data || 'An internal error occurred.';
          throw new InternalServerErrorException(errorMessage);
        }),
      );
  }

  remove(id: string) {
    const orderServiceUrl = this.configService.get<string>('ORDER_SERVICE_URL');
    const findOneOrderUrl = `${orderServiceUrl}/order/${id}`;
    return this.httpService
      .delete(findOneOrderUrl)
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
