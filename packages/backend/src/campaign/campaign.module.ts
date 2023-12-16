import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';

@Module({
  imports: [DatabaseModule],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
