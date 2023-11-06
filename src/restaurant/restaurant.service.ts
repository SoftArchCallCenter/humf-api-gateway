import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Empty,
  CreateRestaurantDto, 
  Restaurant, 
  RestaurantId, 
  RestaurantList, 
  RestaurantServiceClient, 
  UpdateRestaurantDto, 
  FilterRestaurantDto,
  UserIdDto
} from '../../humf-proto/build/proto/restaurant';
import { Observable } from 'rxjs';

@Injectable()
export class RestaurantService implements OnModuleInit {

  private restaurantService: RestaurantServiceClient;

  constructor(@Inject('RESTAURANT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.restaurantService = this.client.getService<RestaurantServiceClient>("RestaurantService")
  }

  findAll(): Observable<RestaurantList>{
    return this.restaurantService.getAllRestaurant({})
  }

  findOne(restaurantId: RestaurantId): Observable<Restaurant>{
    return this.restaurantService.getRestaurant(restaurantId)
  }

  findOneByUserId(userId: UserIdDto): Observable<Restaurant>{
    return this.restaurantService.getRestaurantByUserId(userId)
  }

  filter(filterRestaurantDto: FilterRestaurantDto){
    return this.restaurantService.filterRestaurant(filterRestaurantDto)
  }

  create(createRestaurantDto: CreateRestaurantDto): Observable<Restaurant>{
    return this.restaurantService.addRestaurant(createRestaurantDto)
  }

  update(updateRestaurantDto: UpdateRestaurantDto): Observable<Restaurant>{
    return this.restaurantService.updateRestaurant(updateRestaurantDto)
  }

  remove(restaurantId: RestaurantId): Observable<Empty>{
    return this.restaurantService.deleteRestaurant(restaurantId)
  }
}
