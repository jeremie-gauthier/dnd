import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CampaignService } from './campaign/campaign.service';
import { CampaignModel } from './campaign/model/campaign.model';
import { DatabaseService } from './database/database.service';
import { DatabaseModel } from './database/model.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const databaseService = app.get(DatabaseService);
  await databaseService.init();

  const dbModels: DatabaseModel[] = [app.get(CampaignModel)];
  await Promise.all(dbModels.map((dbModel) => dbModel.registerTable()));

  // POC
  const campaignService = app.get(CampaignService);
  await campaignService.create();

  const PORT = configService.getOrThrow<string>('PORT');
  await app.listen(PORT);
}
bootstrap();
