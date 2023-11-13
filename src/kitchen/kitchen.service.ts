import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { KitchenId, KitchenServiceClient, TicketId, UpdateTicketDto, UserId } from 'humf-proto/build/proto/kitchen';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class KitchenService implements OnModuleInit {

    private kitchenService: KitchenServiceClient;

    constructor(@Inject('KITCHEN_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.kitchenService = this.client.getService<KitchenServiceClient>("KitchenService")
    }

    getTickets(kitchenId: KitchenId) {
        return this.kitchenService.getTickets(kitchenId)
    }

    getTicketsByUserId(userId: UserId){
        return this.kitchenService.getTicketsByUserId(userId)
    }

    updateTicket(updateTicketDto: UpdateTicketDto) {
        return this.kitchenService.updateTicket(updateTicketDto)
    }

    completeTicket(ticketId: TicketId){
        return this.kitchenService.completeTicket(ticketId)
    }

    getAllKitchenTotalTickets(){
        return this.kitchenService.getAllKitchenTotalTickets({})
    }

}
