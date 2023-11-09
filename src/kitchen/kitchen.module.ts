import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KITCHEN_PACKAGE_NAME } from 'humf-proto/build/proto/kitchen';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KITCHEN_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.KITCHEN_SERVICE_URL,
          package: [KITCHEN_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../proto/kitchen.proto')]
        }
      }
    ])
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
