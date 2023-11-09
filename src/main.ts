import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = process.env.API_GATEWAY_PORT || 5000;
  const host = process.env.API_GATEWAY_HOST || "127.0.0.1";

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, host);
}
bootstrap();
