require('dotenv').config()
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MENU_PACKAGE_NAME } from 'humf-proto/build/proto/menu';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MENU_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.RESTAURANT_SERVICE_URL,
          package: [MENU_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../proto/menu.proto')]
        }
      }
    ])
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
