import { Injectable } from '@nestjs/common';
import { map , lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

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



  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}
