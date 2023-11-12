import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get(':id')
  getTickets(@Param('id') id: number){
    return this.kitchenService.getTickets({id : +id});
  }

  @Patch(":id")
  updateTicket(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket({id : +id, status: updateTicketDto.status});
  }
}
