import { IsNotEmpty, IsString } from "class-validator";
import { CampaignProgressionResponseDto } from "src/dtos/response/campaign-progression.dto";
import { CampaignResponseDto } from "src/dtos/response/campaign.dto";

export class NewCampaignStartedInputDto {
  @IsString()
  @IsNotEmpty()
  readonly campaignId: CampaignResponseDto["id"];
}

export class NewCampaignStartedOutputDto {
  readonly campaignProgressionId: CampaignProgressionResponseDto["id"];
}
