import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitchenService } from './kitchen.service';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get(':id')
  getTickets(@Param('id') id: number){
    return this.kitchenService.getTickets({id : +id});
  }
}
