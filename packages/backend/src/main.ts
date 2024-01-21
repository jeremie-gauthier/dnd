import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();

  app.enableCors();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Error at bootstrap:', err);
});
