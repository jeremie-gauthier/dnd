import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { CampaignProgressionStatus } from 'src/database/enums/campaign-progression-status.enum';
import { CampaignStageProgressionStatus } from 'src/database/enums/campaign-stage-progression-status.enum';
import { CampaignStageStatus } from 'src/database/enums/campaign-stage-status.enum';
import { CampaignStatus } from 'src/database/enums/campaign-status.enum';
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
