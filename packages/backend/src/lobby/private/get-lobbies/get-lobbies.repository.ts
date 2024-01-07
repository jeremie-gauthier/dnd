import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { REDIS_LOBBIES_KEY } from 'src/lobby/constants';
import { RedisService } from 'src/redis/redis.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class GetLobbiesRepository {
  constructor(
    private readonly redis: RedisService,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async getLobbies() {
    const lobbies = (await this.redis.client.json.get(REDIS_LOBBIES_KEY)) as LobbyEntity[];
    return lobbies;
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
