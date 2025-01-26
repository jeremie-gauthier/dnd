import { IsNotEmpty, IsString } from "class-validator";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { Campaign } from "src/database/entities/campaign.entity";

export class NewCampaignStartedInputDto {
  @IsString()
  @IsNotEmpty()
  readonly campaignId: Campaign["id"];
}

export class NewCampaignStartedOutputDto {
  readonly campaignProgressionId: CampaignProgression["id"];
}
