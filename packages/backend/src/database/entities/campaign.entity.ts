import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import {
  type CampaignStatusType,
  CampaignStatusValues,
} from "../enums/campaign-status.enum";
import { CampaignProgression } from "./campaign-progression.entity";
import { CampaignStage } from "./campaign-stage.entity";
import { HeroTemplate } from "./hero-template.entity";

@Entity()
export class Campaign {
  @PrimaryColumn()
  readonly id: string;

  @OneToMany(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.campaign,
    {
      cascade: true,
    },
  )
  readonly progressions: Relation<CampaignProgression[]>;

  @OneToMany(
    () => CampaignStage,
    (stage) => stage.campaign,
    { cascade: true },
  )
  readonly stages: Relation<CampaignStage[]>;

  @Column({ type: "enum", enum: CampaignStatusValues })
  readonly status: CampaignStatusType;

  @ManyToMany(
    () => HeroTemplate,
    (heroTemplate) => heroTemplate.playableInCampaigns,
    { cascade: true },
  )
  @JoinTable()
  readonly playableHeroes: Relation<HeroTemplate[]>;
}
