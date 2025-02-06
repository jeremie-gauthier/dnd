import { Injectable } from "@nestjs/common";
import { UseCase } from "src/interfaces/use-case.interface";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import type { UnlockCampaignForUserPayload } from "../../events/unlock-campaign-for-user.payload";
import { CampaignProgressionStatus } from "../../infra/database/enums/campaign-progression-status.enum";
import { CampaignStageProgressionStatus } from "../../infra/database/enums/campaign-stage-progression-status.enum";
import { CreateCampaignForUserRepository } from "./create-campaign-for-user.repository";

@Injectable()
export class CreateCampaignForUserUseCase implements UseCase {
  constructor(private readonly repository: CreateCampaignForUserRepository) {}

  public async execute({ userId, campaignId }: UnlockCampaignForUserPayload) {
    const campaignStages = await this.repository.getCampaignStages({
      campaignId,
    });

    return await this.repository.createCampaignProgression({
      campaign: {
        id: campaignId,
      },
      userId,
      status: CampaignProgressionStatus.AVAILABLE,
      stageProgressions: campaignStages.map((campaignStage) => ({
        stage: { id: campaignStage.id },
        status: this.isFirstStage(campaignStage)
          ? CampaignStageProgressionStatus.AVAILABLE
          : CampaignStageProgressionStatus.LOCKED,
      })),
    });
  }

  private isFirstStage(campaignStage: CampaignStage): boolean {
    return campaignStage.order === 1;
  }
}
