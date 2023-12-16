import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { DatabaseService } from './database.service';
import { AnalyticsModel } from './models/analytics/analytics.model';
import { CampaignTemplateModel } from './models/campaign-template/campaign-template.model';
import { EntityTemplateModel } from './models/entity-template/entity-template.model';
import { GameModel } from './models/game/game.model';
import { ItemTemplateModel } from './models/item-template/item-template.model';
import { MapTemplateModel } from './models/map-template/map-template.model';

@Module({
  providers: [
    DatabaseProvider,
    DatabaseService,
    AnalyticsModel,
    CampaignTemplateModel,
    EntityTemplateModel,
    GameModel,
    ItemTemplateModel,
    MapTemplateModel,
  ],
  exports: [
    DatabaseProvider,
    DatabaseService,
    AnalyticsModel,
    CampaignTemplateModel,
    EntityTemplateModel,
    GameModel,
    ItemTemplateModel,
    MapTemplateModel,
  ],
})
export class DatabaseModule {}
