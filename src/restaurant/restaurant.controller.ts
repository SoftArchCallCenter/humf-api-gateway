import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, FilterRestaurantDto } from '../../humf-proto/build/proto/restaurant'
import { RestaurantUpdateField } from './entities/restaurant.entity';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll(){
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.restaurantService.findOne({id : +id});
  }

  @Get('/user/:id')
  findOneByUserId(@Param('id') id: number) {
    return this.restaurantService.findOneByUserId({id : +id})
  }

  @Get()
  filter(@Body() filterRestaurantDto: FilterRestaurantDto){
    return this.restaurantService.filter(filterRestaurantDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() restaurantUpdateField: RestaurantUpdateField) {
    return this.restaurantService.update({id : +id , ...restaurantUpdateField});
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.restaurantService.remove({id : +id});
  }

}
