import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignProgressionStatus } from 'src/database/entities/campaign-progression.entity';
import { CampaignStageProgressionStatus } from 'src/database/entities/campaign-stage-progression.entity';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewUserRegisteredRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async createNewUser(userId: User['id']): Promise<User> {
    const campaignTemplates = await this.campaignRepository.find({
      select: {
        id: true,
        stages: {
          id: true,
          order: true,
        },
      },
      relations: {
        stages: true,
      },
    });

    const user = this.userRepository.create({
      id: userId,
      campaignProgressions: campaignTemplates.map((campaignTemplate) => ({
        campaign: campaignTemplate,
        status: CampaignProgressionStatus.AVAILABLE,
        stageProgressions: campaignTemplate.stages.map((campaignStage) => ({
          stage: campaignStage,
          status: this.getInitialCampaignStageStatus(campaignStage),
        })),
      })),
    });

    return await this.userRepository.save(user);
  }

  private getInitialCampaignStageStatus(
    campaignStage: CampaignStage,
  ): CampaignStageProgressionStatus {
    if (campaignStage.order === 1) {
      return CampaignStageProgressionStatus.AVAILABLE;
    } else {
      return CampaignStageProgressionStatus.LOCKED;
    }
  }
}
