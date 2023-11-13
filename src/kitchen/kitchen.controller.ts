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

  @Get('/user/:id')
  getTicketsByUserId(@Param('id') id: number){
    return this.kitchenService.getTicketsByUserId({id : +id})
  }

  @Patch(":id")
  updateTicket(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket({id : +id, status: updateTicketDto.status});
  }

  @Post(":id")
  completeTicket(@Param('id') id: number){
    return this.kitchenService.completeTicket({id : +id});
  }

  @Get('/ticket')
  getAllKitchenTotalTickets(){
    return this.kitchenService.getAllKitchenTotalTickets()
  }
}
