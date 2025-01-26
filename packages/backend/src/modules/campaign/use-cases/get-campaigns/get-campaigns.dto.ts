import { PickType } from "@nestjs/swagger";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";

class StageSchema extends PickType(CampaignStage, [
  "id",
  "order",
  "status",
] as const) {}

export class GetCampaignOutputDto extends PickType(Campaign, [
  "id",
  "status",
] as const) {
  readonly currentStage: StageSchema;
  readonly nbStages: number;
}
