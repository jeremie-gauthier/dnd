class ConfigCampaignStage {
  readonly id: string;
  readonly order: number;
}

class ConfigCampaign {
  readonly id: string;
  readonly nbStages: number;
  readonly stage: ConfigCampaignStage;
}

export class Config {
  readonly nbPlayersMax: number;
  readonly campaign: ConfigCampaign;
}
