import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { CampaignStageProgression } from 'src/database/entities/campaign-stage-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { NewUserCreatedListener } from './events/listeners/new-user-created/new-user-created.listener';
import { NewUserCreatedRepository } from './events/listeners/new-user-created/new-user-created.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Campaign, CampaignProgression, CampaignStageProgression]),
  ],
  providers: [NewUserCreatedListener, NewUserCreatedRepository],
})
export class CampaignModule {}
