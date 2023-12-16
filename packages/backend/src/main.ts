import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import { AnalyticsModel } from './database/models/analytics/analytics.model';
import { CampaignTemplateModel } from './database/models/campaign-template/campaign-template.model';
import { EntityTemplateModel } from './database/models/entity-template/entity-template.model';
import { GameModel } from './database/models/game/game.model';
import { ItemTemplateModel } from './database/models/item-template/item-template.model';
import { MapTemplateModel } from './database/models/map-template/map-template.model';
import { DatabaseModel } from './database/models/model.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const databaseService = app.get(DatabaseService);
  const dbModels: DatabaseModel<unknown>[] = [
    app.get(CampaignTemplateModel),
    app.get(ItemTemplateModel),
    app.get(EntityTemplateModel),
    app.get(AnalyticsModel),
    app.get(GameModel),
    app.get(MapTemplateModel),
  ];
  await databaseService.init(dbModels);

  app.enableCors();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
