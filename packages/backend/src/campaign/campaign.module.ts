import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampaignService } from './campaign.service';
import { CampaignModel } from './model/campaign.model';

@Module({
  imports: [DatabaseModule],
  providers: [CampaignModel, CampaignService],
})
export class CampaignModule {}
