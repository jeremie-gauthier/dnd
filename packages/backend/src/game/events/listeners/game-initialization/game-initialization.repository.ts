import type { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { User } from "src/database/entities/user.entity";
import { GamesRepository } from "src/redis/repositories/games.repository";
import type { Repository } from "typeorm";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async getUserCampaignStageProgression({
    campaignStageId,
    userId,
  }: {
    campaignStageId: CampaignStage["id"];
    userId: User["id"];
  }): Promise<CampaignStageProgression> {
    return await this.campaignStageProgressionRepository.findOneOrFail({
      where: {
        stage: {
          id: campaignStageId,
        },
        campaignProgression: {
          user: {
            id: userId,
          },
        },
      },
      relations: {
        stage: {
          campaign: true,
        },
        campaignProgression: {
          heroes: true,
        },
      },
    });
  }

  public async saveGame(game: GameEntity): Promise<GameEntity> {
    return await this.gamesRepository.set(game);
  }
}
