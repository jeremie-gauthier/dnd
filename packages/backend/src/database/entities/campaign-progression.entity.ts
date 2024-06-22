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
import { Hero } from "./hero.entity";
import { User } from "./user.entity";

@Entity()
@Index(["campaign", "user"], { unique: true })
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

  @ManyToOne(
    () => User,
    (user) => user.campaignProgressions,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly user: Relation<User>;

  @OneToMany(
    () => CampaignStageProgression,
    (campaignStageProgression) => campaignStageProgression.campaignProgression,
    { cascade: true },
  )
  readonly stageProgressions: Relation<CampaignStageProgression[]>;

  @OneToMany(
    () => Hero,
    (hero) => hero.campaignProgression,
    { cascade: true },
  )
  readonly heroes: Relation<Hero[]>;

  @Column({ type: "enum", enum: CampaignProgressionStatusValues })
  status: CampaignProgressionStatusType;
}
