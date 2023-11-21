import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampaignService } from './campaign.service';
import { CampaignModel } from './model/campaign.model';
import { CampaignController } from './campaign.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CampaignModel, CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
