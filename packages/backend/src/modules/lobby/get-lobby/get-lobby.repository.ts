import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { Campaign } from "src/database/entities/campaign.entity";
import { type Repository } from "typeorm";

@Injectable()
export class GetLobbyRepository {
  constructor(
    @InjectRepository(CampaignStage)
    private readonly campaignStageRepository: Repository<CampaignStage>,
  ) {}

  public getCampaignStageById(campaignStageId: Campaign["id"]) {
    return this.campaignStageRepository.findOneOrFail({
      where: {
        id: campaignStageId,
      },
    });
  }
}
