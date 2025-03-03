import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CampaignStageEligibility {
  @PrimaryGeneratedColumn("uuid")
  readonly campaignStageId: string;
}
