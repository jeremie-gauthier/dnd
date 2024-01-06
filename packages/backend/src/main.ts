import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const env = configService.get('NODE_ENV');
  if (env === 'development') {
    const redis: Cache = app.get(CACHE_MANAGER);
    await redis.reset();
  }

  app.enableCors();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
