import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';
import { Repository } from 'typeorm';

@Injectable()
export class GetLobbyRepository {
  constructor(
    @InjectRepository(CampaignStage)
    private readonly campaignStageRepository: Repository<CampaignStage>,
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public getLobbyById(lobbyId: LobbyEntity['id']) {
    return this.lobbiesRepository.getOne(lobbyId);
  }

  public getCampaignStageById(campaignStageId: Campaign['id']) {
    return this.campaignStageRepository.findOneOrFail({
      where: {
        id: campaignStageId,
      },
      relations: {
        campaign: {
          playableHeroes: true,
        },
      },
    });
  }
}