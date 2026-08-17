import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('RestroClubBackend');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`🚀 NestJS Enterprise API running at: http://localhost:${port}`);
  logger.log(`📊 Health Endpoint: http://localhost:${port}/api/health`);
  logger.log(`📦 Master Store API: http://localhost:${port}/api/master-store`);
}

bootstrap();
