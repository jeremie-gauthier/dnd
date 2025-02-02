import { Expose, Type } from "class-transformer";

class ConfigCampaignStage {
  @Expose()
  readonly id: string;

  @Expose()
  readonly order: number;
}

class ConfigCampaign {
  @Expose()
  readonly id: string;

  @Expose()
  readonly nbStages: number;

  @Expose()
  @Type(() => ConfigCampaignStage)
  readonly stage: ConfigCampaignStage;
}

export class ConfigResponseDto {
  @Expose()
  readonly nbPlayersMax: number;

  @Expose()
  @Type(() => ConfigCampaign)
  readonly campaign: ConfigCampaign;
}
