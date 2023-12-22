import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CampaignProgression,
  CampaignProgressionStatus,
} from 'src/database/entities/campaign-progression.entity';
import {
  CampaignStageProgression,
  CampaignStageProgressionStatus,
} from 'src/database/entities/campaign-stage-progression.entity';
import { CampaignStage, CampaignStageStatus } from 'src/database/entities/campaign-stage.entity';
import { Campaign, CampaignStatus } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewUserCreatedRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
  ) {}

  public async getUserById(userId: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id: userId });
  }

  public async getAllCampaignsWithStages(): Promise<Campaign[]> {
    return await this.campaignRepository.find({
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
    });
  }

  public async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public createCampaignProgression(campaign: Campaign): CampaignProgression {
    return this.campaignProgressionRepository.create({
      campaign,
      status: this.getCampaignProgressionStatus(campaign.status),
      stageProgressions: campaign.stages.map(this.createCampaignStageProgression),
    });
  }

  private getCampaignProgressionStatus(
    campaignStatus: Campaign['status'],
  ): CampaignProgression['status'] {
    switch (campaignStatus) {
      case CampaignStatus.AVAILABLE:
        return CampaignProgressionStatus.AVAILABLE;
      case CampaignStatus.COMING_SOON:
        return CampaignProgressionStatus.LOCKED;
      case CampaignStatus.DISABLED:
        return CampaignProgressionStatus.LOCKED;
    }
  }

  private createCampaignStageProgression(stage: CampaignStage): Partial<CampaignStageProgression> {
    return this.campaignStageProgressionRepository.create({
      stage,
      status: this.getCampaignStageStatus(stage),
    });
  }

  private getCampaignStageStatus(campaignStage: CampaignStage): CampaignStageProgressionStatus {
    switch (campaignStage.status) {
      case CampaignStageStatus.AVAILABLE:
        if (campaignStage.order === 1) {
          return CampaignStageProgressionStatus.AVAILABLE;
        } else {
          return CampaignStageProgressionStatus.LOCKED;
        }
      case CampaignStageStatus.COMING_SOON:
        return CampaignStageProgressionStatus.LOCKED;
      case CampaignStageStatus.DISABLED:
        return CampaignStageProgressionStatus.LOCKED;
    }
  }
}
