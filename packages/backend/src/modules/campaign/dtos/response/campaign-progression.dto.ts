import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  CampaignProgressionStatus,
  CampaignProgressionStatusType,
} from "../../infra/database/enums/campaign-progression-status.enum";

export class CampaignProgressionResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly userId: string;

  @Expose()
  @ApiProperty({
    enum: CampaignProgressionStatus,
    enumName: "CampaignProgressionStatus",
  })
  readonly status: CampaignProgressionStatusType;
}
