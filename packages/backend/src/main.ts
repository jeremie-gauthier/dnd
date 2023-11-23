import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AnalyticsModel } from './analytics/model/analytics.model';
import { AppModule } from './app.module';
import { CampaignModel } from './campaign/model/campaign.model';
import { DatabaseService } from './database/database.service';
import { DatabaseModel } from './database/model.abstract';
import { EntityModel } from './entity/model/entity.model';
import { ItemModel } from './item/model/item.model';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);

  const databaseService = app.get(DatabaseService);
  await databaseService.init();

  const dbModels: DatabaseModel[] = [
    app.get(CampaignModel),
    app.get(ItemModel),
    app.get(EntityModel),
    app.get(AnalyticsModel),
  ];
  await Promise.all(dbModels.map((dbModel) => dbModel.registerTable()));

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
