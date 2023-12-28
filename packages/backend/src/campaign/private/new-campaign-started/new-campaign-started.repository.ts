import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CampaignProgression,
  CampaignProgressionStatus,
} from 'src/database/entities/campaign-progression.entity';
import { CampaignStageProgressionStatus } from 'src/database/entities/campaign-stage-progression.entity';
import { CampaignStageStatus } from 'src/database/entities/campaign-stage.entity';
import { Campaign, CampaignStatus } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewCampaignStartedRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public async getUserById(userId: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id: userId });
  }

  public async getCampaignWithFirstStageById(campaignId: Campaign['id']): Promise<Campaign> {
    return await this.campaignRepository.findOneOrFail({
      select: {
        id: true,
        status: true,
        stages: {
          id: true,
          order: true,
          status: true,
        },
      },
      relations: {
        stages: true,
      },
      where: {
        id: campaignId,
        status: CampaignStatus.AVAILABLE,
        stages: {
          order: 1,
          status: CampaignStageStatus.AVAILABLE,
        },
      },
    });
  }

  public async createCampaignProgressionForUser(
    userId: User['id'],
    campaign: Campaign,
  ): Promise<CampaignProgression> {
    return await this.campaignProgressionRepository.save({
      user: {
        id: userId,
      },
      campaign,
      status: CampaignProgressionStatus.AVAILABLE,
      stageProgressions: [
        {
          stage: campaign.stages[0],
          status: CampaignStageProgressionStatus.AVAILABLE,
        },
      ],
    });
  }
}
