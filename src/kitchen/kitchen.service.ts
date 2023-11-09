import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { KitchenId, KitchenServiceClient } from 'humf-proto/build/proto/kitchen';
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
}
