import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  CampaignStageStatus,
  CampaignStageStatusType,
} from "src/database/enums/campaign-stage-status.enum";

export class CampaignStageResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly order: number;

  @Expose()
  readonly maxLevelLoot: number;

  @Expose()
  @ApiProperty({ enum: CampaignStageStatus, enumName: "CampaignStageStatus" })
  readonly status: CampaignStageStatusType;
}
