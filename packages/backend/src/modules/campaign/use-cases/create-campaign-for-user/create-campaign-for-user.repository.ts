import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import type { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import type { DeepPartial, Repository } from "typeorm";

@Injectable()
export class CreateCampaignForUserRepository {
  constructor(
    @InjectRepository(CampaignStage)
    private readonly campaignStageRepository: Repository<CampaignStage>,
    @InjectRepository(CampaignProgression)
    private readonly campaignProgressionRepository: Repository<CampaignProgression>,
  ) {}

  public getCampaignStages({
    campaignId,
  }: { campaignId: Campaign["id"] }): Promise<CampaignStage[]> {
    return this.campaignStageRepository.find({
      select: {
        id: true,
        status: true,
        order: true,
      },
      where: {
        campaign: {
          id: campaignId,
        },
      },
    });
  }

  public createCampaignProgression(
    campaignProgression: DeepPartial<CampaignProgression>,
  ) {
    return this.campaignProgressionRepository.save(campaignProgression);
  }
}
