import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';
import { In, Repository } from 'typeorm';

@Injectable()
export class GetLobbiesRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async getLobbies() {
    return await this.lobbiesRepository.getMany();
  }

  public async getCampaigns(stageIds: CampaignStage['id'][]): Promise<Campaign[]> {
    const campaigns = await this.campaignRepository.find({
      select: {
        id: true,
        title: true,
        stages: {
          id: true,
          order: true,
          title: true,
        },
      },
      where: {
        stages: {
          id: In([...stageIds]),
        },
      },
      relations: {
        stages: true,
      },
    });

    return campaigns;
  }
}
