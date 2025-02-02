import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  CampaignProgressionStatus,
  CampaignProgressionStatusType,
} from "src/database/enums/campaign-progression-status.enum";

export class CampaignProgressionResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({
    enum: CampaignProgressionStatus,
    enumName: "CampaignProgressionStatus",
  })
  readonly status: CampaignProgressionStatusType;
}
