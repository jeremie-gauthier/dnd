import type { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attack } from "src/database/entities/attack.entity";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Dice } from "src/database/entities/dice.entity";
import type { User } from "src/database/entities/user.entity";
import { GamesRepository } from "src/redis/repositories/games.repository";
import { FindOptionsRelations, In, type Repository } from "typeorm";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
    @InjectRepository(Dice)
    private readonly diceRepository: Repository<Dice>,
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
          heroes: {
            inventory: {
              stuff: {
                item: {
                  ["attacks" as any]: {
                    attackDices: {
                      dice: true,
                    },
                  } as FindOptionsRelations<Attack>,
                  ["perks" as any]: true,
                },
              },
            },
          },
        },
      },
    });
  }

  public async saveGame(game: GameEntity): Promise<GameEntity> {
    return await this.gamesRepository.set(game);
  }

  public getDicesByNames({
    diceNames,
  }: { diceNames: Dice["name"][] }): Promise<Dice[]> {
    return this.diceRepository.find({
      where: {
        name: In(diceNames),
      },
    });
  }
}
