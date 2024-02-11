import type { GameEntity, LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { User } from 'src/database/entities/user.entity';
import { GamesRepository } from 'src/redis/repositories/games.repository';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';
import { Repository } from 'typeorm';

@Injectable()
export class StartGameRepository {
  constructor(
    @InjectRepository(CampaignStage)
    private readonly campaignStageRepository: Repository<CampaignStage>,
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public getLobbyById(lobbyId: LobbyEntity['id']): Promise<LobbyEntity | null> {
    return this.lobbiesRepository.getOne(lobbyId);
  }

  public async updateLobby(lobby: LobbyEntity): Promise<void> {
    await this.lobbiesRepository.update(lobby);
  }

  public async createGame(game: GameEntity): Promise<GameEntity> {
    return await this.gamesRepository.set(game);
  }

  public async getStageAndProgression({
    stageId,
    userId,
  }: {
    stageId: CampaignStage['id'];
    userId: User['id'];
  }): Promise<CampaignStage> {
    return this.campaignStageRepository.findOneOrFail({
      where: {
        id: stageId,
        campaign: {
          progressions: {
            user: {
              id: userId,
            },
          },
        },
      },
      relations: {
        campaign: {
          progressions: {
            heroes: true,
          },
        },
        progressions: true,
      },
    });
  }
}
