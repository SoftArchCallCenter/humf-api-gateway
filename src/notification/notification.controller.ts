import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { GetByUserNotificationDto } from './dto/get-by-user-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get('status/:order_id')
  getStatus(@Param('order_id') order_id: string) {
    return this.notificationService.getStatus(order_id);
  }

  @Post('/user')
  getNotiByUser(@Body() getNotiByUserDto: GetByUserNotificationDto) {
    // console.log({getNotiByUserDto})
    return this.notificationService.getNotiByUser(getNotiByUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationService.remove(+id);
  // }
}
