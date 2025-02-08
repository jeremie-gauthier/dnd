import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CampaignStageEligibility {
  @PrimaryColumn("uuid")
  readonly campaignStageId: string;
}
