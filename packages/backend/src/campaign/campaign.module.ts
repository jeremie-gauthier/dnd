import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from 'src/authz/authz.module';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { CampaignPrivateController } from './private/campaign-private.controller';
import { GetCampaignsRepository } from './private/get-campaigns/get-campaigns.repository';
import { GetCampaignsUseCase } from './private/get-campaigns/get-campaigns.uc';
import { NewCampaignStartedRepository } from './private/new-campaign-started/new-campaign-started.repository';
import { NewCampaignStartedUseCase } from './private/new-campaign-started/new-campaign-started.uc';

@Module({
  imports: [AuthzModule, TypeOrmModule.forFeature([User, Campaign, CampaignProgression])],
  controllers: [CampaignPrivateController],
  providers: [
    NewCampaignStartedUseCase,
    NewCampaignStartedRepository,
    GetCampaignsUseCase,
    GetCampaignsRepository,
  ],
})
export class CampaignModule {}
