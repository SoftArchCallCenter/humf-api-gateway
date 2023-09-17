import { Injectable, Inject } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Client, ClientGrpc, Transport} from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class RestaurantService {
  // @Client({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'restaurant',
  //     protoPath: join(__dirname, '../../HUMF_Proto/proto/restaurant.proto'),
  //   },
  // })
  // client: ClientGrpc;

  private restaurantService: RestaurantService;

  constructor(@Inject('RESTAURANT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.restaurantService = this.client.getService<RestaurantService>('RestaurantService');
  }

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  findAll() {
    return this.restaurantService.findAll();
  }

  findOne(id: number) {
    return this.restaurantService.findOne(id);
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id,updateRestaurantDto);
  }

  remove(id: number) {
    return this.restaurantService.remove(id);
  }
}
