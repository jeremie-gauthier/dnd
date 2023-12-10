import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignTemplateModel } from './model/campaign-template.model';

@Module({
  imports: [DatabaseModule],
  providers: [CampaignTemplateModel, CampaignService],
  controllers: [CampaignController],
  exports: [CampaignService],
})
export class CampaignModule {}
