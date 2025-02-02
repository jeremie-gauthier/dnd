import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { MonsterTemplate } from "src/database/entities/monster-template.entity";
import { User } from "src/database/entities/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
    @InjectRepository(MonsterTemplate)
    private readonly monsterTemplateRepository: Repository<MonsterTemplate>,
  ) {}

  public async getEnemiesByNames({
    enemiesName,
  }: {
    enemiesName: MonsterTemplate["race"][];
  }): Promise<MonsterTemplate[]> {
    return this.monsterTemplateRepository.find({
      where: {
        race: In(enemiesName),
      },
    });
  }

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
                item: true,
              },
            },
          },
        },
      },
    });
  }
}
