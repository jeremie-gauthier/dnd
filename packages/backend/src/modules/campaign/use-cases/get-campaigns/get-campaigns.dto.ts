import { PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CampaignStageResponseDto } from "src/dtos/response/campaign-stage.dto";
import { CampaignResponseDto } from "src/dtos/response/campaign.dto";

class StageSchema extends PickType(CampaignStageResponseDto, [
  "id",
  "order",
  "status",
] as const) {}

export class GetCampaignOutputDto extends PickType(CampaignResponseDto, [
  "id",
  "status",
] as const) {
  @Expose()
  @Type(() => StageSchema)
  readonly currentStage: StageSchema;

  @Expose()
  readonly nbStages: number;
}
