import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { CampaignStageProgression } from 'src/database/entities/campaign-stage-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Campaign, CampaignProgression, CampaignStageProgression]),
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
