require('dotenv').config()
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'MENU_PACKAGE',
      transport: Transport.GRPC,
      options: {
        url: process.env.URL,
        package: 'menu',
        protoPath: join(__dirname, "../../proto/menu.proto"),
      },
    },
  ])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
