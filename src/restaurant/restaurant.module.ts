import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RESTAURANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'restaurant',
          protoPath: join(__dirname, '../../humf-proto/proto/restaurant.proto'),
        },
      },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
