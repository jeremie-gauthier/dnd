import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  CampaignStatus,
  CampaignStatusType,
} from "src/database/enums/campaign-status.enum";

export class CampaignResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: CampaignStatus, enumName: "CampaignStatus" })
  readonly status: CampaignStatusType;
}
