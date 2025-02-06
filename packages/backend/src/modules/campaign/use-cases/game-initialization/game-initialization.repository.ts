import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/modules/campaign/infra/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import { Repository } from "typeorm";
import { CampaignProgression } from "../../infra/database/entities/campaign-progression.entity";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
  ) {}

  public async getUserCampaignStageProgression({
    campaignStageId,
    userId,
  }: {
    campaignStageId: CampaignStage["id"];
    userId: CampaignProgression["userId"];
  }): Promise<CampaignStageProgression> {
    return await this.campaignStageProgressionRepository.findOneOrFail({
      where: {
        stage: {
          id: campaignStageId,
        },
        campaignProgression: {
          userId,
        },
      },
      relations: {
        stage: {
          campaign: true,
        },
        campaignProgression: true,
      },
    });
  }
}
