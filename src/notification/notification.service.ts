import { Injectable } from '@nestjs/common';
import { map , lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { GetByUserNotificationDto } from './dto/get-by-user-notification.dto';

@Injectable()
export class NotificationService {

  constructor(
    private httpService: HttpService,
  ) {}

  async findAll() {
    const notifications = await lastValueFrom(
      this.httpService.get("http://localhost:6000/").pipe(
        map(res => res.data)
      )
    );
    return {
      notification: notifications
    };
  }

  async getStatus(order_id: string) {
    const status = await lastValueFrom(
      this.httpService.get(`http://localhost:6000/status${order_id}`).pipe(
        map(res => res.data)
      )
    );
    return {
      order_id: order_id,
      status: status
    }
  }

  async getNotiByUser(getNotiByUserDto: GetByUserNotificationDto) {
    const notifications = await lastValueFrom(
      this.httpService.post(`http://localhost:6000/user`,getNotiByUserDto).pipe(
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
