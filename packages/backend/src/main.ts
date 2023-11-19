import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const databaseService = app.get(DatabaseService);
  await databaseService.init();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT);
}
bootstrap();
