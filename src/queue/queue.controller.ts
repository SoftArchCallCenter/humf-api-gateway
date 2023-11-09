import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AcceptOrderDto, Order } from 'humf-proto/build/proto/queue';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('/order')
  createOrder(@Body() order: Order) {
    return this.queueService.createOrder(order);
  }

  @Get(':id')
  consumeQueue(@Param('id') id: string) {
    return this.queueService.consumeQueue({id: +id});
  }

  @Post('/accept')
  acceptOrder(@Body() acceptOrderDto: AcceptOrderDto) {
    return this.queueService.acceptOrder(acceptOrderDto);
  }

}
