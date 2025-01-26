import { IsNotEmpty, IsString } from "class-validator";

export class NewCampaignStartedOutputDto {
  @IsString()
  @IsNotEmpty()
  readonly campaignProgressionId: string;
}
