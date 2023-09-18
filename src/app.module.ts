import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RestaurantModule } from './restaurant/restaurant.module';


@Module({
  imports: [UsersModule, AuthModule,
    ClientsModule.register([
      {
        name: 'RESTAURANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'restaurant',
          protoPath: join(__dirname, "../humf-proto/proto/restaurant.proto"),
        },
      },
    ]),
    RestaurantModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
