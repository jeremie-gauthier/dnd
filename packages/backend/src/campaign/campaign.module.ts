import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { CampaignPrivateController } from './private/campaign-private.controller';
import { NewCampaignStartedRepository } from './private/new-campaign-started/new-campaign-started.repository';
import { NewCampaignStartedUseCase } from './private/new-campaign-started/new-campaign-started.uc';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaign, CampaignProgression])],
  controllers: [CampaignPrivateController],
  providers: [NewCampaignStartedUseCase, NewCampaignStartedRepository],
})
export class CampaignModule {}
