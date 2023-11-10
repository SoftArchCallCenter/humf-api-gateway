import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_PACKAGE_NAME } from 'humf-proto/build/proto/queue';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUEUE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.QUEUE_SERVICE_URL,
          package: [QUEUE_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../proto/queue.proto')]
        }
      }
    ])
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
