import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  RelationId,
} from "typeorm";
import {
  type CampaignStageProgressionStatusType,
  CampaignStageProgressionStatusValues,
} from "../enums/campaign-stage-progression-status.enum";
import { CampaignProgression } from "./campaign-progression.entity";
import { CampaignStage } from "./campaign-stage.entity";

@Entity()
@Index(["campaignProgression", "stage"], { unique: true })
export class CampaignStageProgression {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.stageProgressions,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly campaignProgression: Relation<CampaignProgression>;

  @ManyToOne(
    () => CampaignStage,
    (campaignStage) => campaignStage.progressions,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly stage: Relation<CampaignStage>;

  @RelationId(
    (campaignStageProgression: CampaignStageProgression) =>
      campaignStageProgression.stage,
  )
  readonly stageId: Relation<CampaignStage["id"]>;

  @Column({
    type: "enum",
    enum: CampaignStageProgressionStatusValues,
    enumName: "CampaignStageProgression",
  })
  status: CampaignStageProgressionStatusType;
}
