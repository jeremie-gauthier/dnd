import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { CampaignProgressionResponseDto } from "../../dtos/response/campaign-progression.dto";
import { CampaignResponseDto } from "../../dtos/response/campaign.dto";

export class NewCampaignStartedInputDto {
  @IsString()
  @IsNotEmpty()
  readonly campaignId: CampaignResponseDto["id"];
}

export class NewCampaignStartedOutputDto {
  @Expose()
  readonly campaignProgressionId: CampaignProgressionResponseDto["id"];
}
