require('dotenv').config()
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RESTAURANT_PACKAGE_NAME } from 'humf-proto/build/proto/restaurant';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RESTAURANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.RESTAURANT_SERVICE_URL,
          package: [RESTAURANT_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../proto/restaurant.proto')]
        }
      }
    ])
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
