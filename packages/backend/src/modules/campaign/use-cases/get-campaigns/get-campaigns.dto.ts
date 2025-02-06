import { PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CampaignStageResponseDto } from "../../dtos/response/campaign-stage.dto";
import { CampaignResponseDto } from "../../dtos/response/campaign.dto";

class StageSchemaDto extends PickType(CampaignStageResponseDto, [
  "id",
  "order",
  "status",
] as const) {}

export class GetCampaignOutputDto extends PickType(CampaignResponseDto, [
  "id",
  "status",
] as const) {
  @Expose()
  @Type(() => StageSchemaDto)
  readonly currentStage: StageSchemaDto;

  @Expose()
  readonly nbStages: number;
}
