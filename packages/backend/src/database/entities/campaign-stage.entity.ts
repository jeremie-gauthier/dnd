import { MapCompiledJson } from "@dnd/shared";
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import {
  CampaignStageStatusValues,
  type CampaignStageStatusType,
} from "../enums/campaign-stage-status.enum";
import { CampaignStageProgression } from "./campaign-stage-progression.entity";
import { Campaign } from "./campaign.entity";

@Entity()
@Index(["campaign", "order"], { unique: true })
export class CampaignStage {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => Campaign,
    (campaign) => campaign.stages,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly campaign: Relation<Campaign>;

  @Column()
  readonly order: number;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.stage,
    { cascade: true },
  )
  readonly progressions: Relation<CampaignStageProgression[]>;

  @Column()
  readonly title: string;

  @Column()
  readonly intro: string;

  @Column()
  readonly outro: string;

  @Column({ type: "json" })
  readonly mapCompiled: MapCompiledJson;

  @Column({ type: "enum", enum: CampaignStageStatusValues })
  status: CampaignStageStatusType;
}
