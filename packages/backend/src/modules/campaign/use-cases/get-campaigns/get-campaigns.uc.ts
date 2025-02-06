import { Injectable } from "@nestjs/common";
import type { UseCase } from "src/interfaces/use-case.interface";
import type { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { CampaignStageProgressionStatus } from "../../infra/database/enums/campaign-stage-progression-status.enum";
import { GetCampaignOutputDto } from "./get-campaigns.dto";
import { GetCampaignsRepository } from "./get-campaigns.repository";

@Injectable()
export class GetCampaignsUseCase implements UseCase {
  constructor(private readonly repository: GetCampaignsRepository) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<Array<GetCampaignOutputDto>> {
    const userCampaignsProgressions =
      await this.repository.getUserCampaignsProgressions(userId);
    return this.getUserCampaignsProgressions(userCampaignsProgressions);
  }

  private getUserCampaignsProgressions(
    campaignProgressions: CampaignProgression[],
  ): Array<GetCampaignOutputDto> {
    return campaignProgressions.map((campaignProgression) => {
      return this.getUserCampaignProgression(campaignProgression);
    });
  }

  private getUserCampaignProgression(
    campaignProgression: CampaignProgression,
  ): GetCampaignOutputDto {
    const mostAdvancedStage = campaignProgression.stageProgressions.find(
      (stageProgression) =>
        stageProgression.status === CampaignStageProgressionStatus.AVAILABLE,
    )!.stage;

    return {
      ...campaignProgression.campaign,
      currentStage: mostAdvancedStage,
      nbStages: campaignProgression.stageProgressions.length,
    };
  }
}
