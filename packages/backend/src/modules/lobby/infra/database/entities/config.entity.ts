import { Column } from "typeorm";

class ConfigCampaignStage {
  @Column()
  readonly id: string;

  @Column()
  readonly order: number;
}

class ConfigCampaign {
  @Column()
  readonly id: string;

  @Column()
  readonly nbStages: number;

  @Column(() => ConfigCampaignStage)
  readonly stage: ConfigCampaignStage;
}

export class Config {
  @Column()
  readonly nbPlayersMax: number;

  @Column(() => ConfigCampaign)
  readonly campaign: ConfigCampaign;
}
