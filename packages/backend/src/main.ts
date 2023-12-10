import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AnalyticsModel } from './analytics/model/analytics.model';
import { AppModule } from './app.module';
import { CampaignTemplateModel } from './campaign/model/campaign-template.model';
import { DatabaseService } from './database/database.service';
import { DatabaseModel } from './database/model.abstract';
import { EntityTemplateModel } from './entity/model/entity-template.model';
import { GameModel } from './game/model/game.model';
import { ItemTemplateModel } from './item/model/item-template.model';
import { MapTemplateModel } from './map/model/map-template.model';
import { UserModel } from './user/model/user.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const databaseService = app.get(DatabaseService);
  await databaseService.init();

  const dbModels: DatabaseModel<unknown>[] = [
    app.get(CampaignTemplateModel),
    app.get(ItemTemplateModel),
    app.get(EntityTemplateModel),
    app.get(AnalyticsModel),
    app.get(GameModel),
    app.get(MapTemplateModel),
    app.get(UserModel),
  ];
  await Promise.all(dbModels.map((dbModel) => dbModel.registerTable()));

  app.enableCors();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
