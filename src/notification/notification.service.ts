import { Injectable } from '@nestjs/common';
import { map , lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { GetByUserNotificationDto } from './dto/get-by-user-notification.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findAll() {
    const notiServiceUrl = this.configService.get<string>('NOTIFICATION_SERVICE_URL');
    const notifications = await lastValueFrom(
      this.httpService.get(`${notiServiceUrl}`).pipe(
        map(res => res.data)
      )
    );
    return {
      notification: notifications
    };
  }

  async getStatus(order_id: string) {
    const notiServiceUrl = this.configService.get<string>('NOTIFICATION_SERVICE_URL');
    const status = await lastValueFrom(
      this.httpService.get(`${notiServiceUrl}/status${order_id}`).pipe(
        map(res => res.data)
      )
    );
    return {
      order_id: order_id,
      status: status
    }
  }

  async getNotiByUser(getNotiByUserDto: GetByUserNotificationDto) {
    const notiServiceUrl = this.configService.get<string>('NOTIFICATION_SERVICE_URL');
    console.log({notiServiceUrl})
    const notifications = await lastValueFrom(
      this.httpService.post(`${notiServiceUrl}/user`,getNotiByUserDto).pipe(
        map(res => res.data)
      )
    );
    return {
      notification: notifications
    };
  }



  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}
