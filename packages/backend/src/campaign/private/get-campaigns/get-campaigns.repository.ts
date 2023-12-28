import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign, CampaignStatus } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetCampaignsRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public getAvailableCampaigns(): Promise<Campaign[]> {
    return this.campaignRepository.find({
      relations: {
        stages: true,
      },
      where: {
        status: CampaignStatus.AVAILABLE,
      },
      order: {
        stages: {
          order: 'ASC',
        },
      },
    });
  }

  public getStartedCampaigns(userId: User['id']): Promise<CampaignProgression[]> {
    return this.campaignProgressionRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        stageProgressions: {
          stage: true,
        },
      },
    });
  }
}
