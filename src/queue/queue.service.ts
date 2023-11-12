import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { AcceptOrderDto, Order, QueueServiceClient } from 'humf-proto/build/proto/queue';
import { ClientGrpc } from '@nestjs/microservices';
import { RestaurantId } from 'humf-proto/build/proto/menu';

@Injectable()
export class QueueService implements OnModuleInit {

  private kitchenService: QueueServiceClient;

  constructor(@Inject('QUEUE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
      this.kitchenService = this.client.getService<QueueServiceClient>("QueueService")
  }

  createOrder(order: Order){
    return this.kitchenService.createOrder(order)
  }

  consumeQueue(restaurantId: RestaurantId){
    return this.kitchenService.consumeQueue(restaurantId)
  }

  acceptOrder(acceptOrderDto: AcceptOrderDto){
    return this.kitchenService.acceptOrder(acceptOrderDto)
  }

}
