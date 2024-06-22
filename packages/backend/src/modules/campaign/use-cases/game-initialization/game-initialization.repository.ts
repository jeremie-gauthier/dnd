import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { User } from "src/database/entities/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
    @InjectRepository(EnemyTemplate)
    private readonly enemyTemplateRepository: Repository<EnemyTemplate>,
  ) {}

  public async getEnemiesByNames({
    enemiesName,
  }: {
    enemiesName: EnemyTemplate["name"][];
  }): Promise<EnemyTemplate[]> {
    return this.enemyTemplateRepository.find({
      where: {
        name: In(enemiesName),
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
