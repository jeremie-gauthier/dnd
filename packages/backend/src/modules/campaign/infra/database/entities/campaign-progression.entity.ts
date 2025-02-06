import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  RelationId,
} from "typeorm";
import {
  type CampaignProgressionStatusType,
  CampaignProgressionStatusValues,
} from "../enums/campaign-progression-status.enum";
import { CampaignStageProgression } from "./campaign-stage-progression.entity";
import { Campaign } from "./campaign.entity";

@Entity()
@Index(["campaign", "userId"], { unique: true })
export class CampaignProgression {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => Campaign,
    (campaign) => campaign.stages,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly campaign: Relation<Campaign>;

  @RelationId(
    (campaignProgression: CampaignProgression) => campaignProgression.campaign,
  )
  readonly campaignId: Relation<Campaign["id"]>;

  @Column()
  readonly userId: string;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.campaignProgression,
    { cascade: true },
  )
  readonly stageProgressions: Relation<CampaignStageProgression[]>;

  @Column({ type: "enum", enum: CampaignProgressionStatusValues })
  status: CampaignProgressionStatusType;
}
