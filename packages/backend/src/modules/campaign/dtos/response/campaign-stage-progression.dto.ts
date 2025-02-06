import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  CampaignStageProgressionStatus,
  CampaignStageProgressionStatusType,
} from "../../infra/database/enums/campaign-stage-progression-status.enum";

export class CampaignStageProgressionResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({
    enum: CampaignStageProgressionStatus,
    enumName: "CampaignStageProgressionStatus",
  })
  readonly status: CampaignStageProgressionStatusType;
}
