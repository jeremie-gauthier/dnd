import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Module({
  providers: [CampaignService],
})
export class CampaignModule {}
