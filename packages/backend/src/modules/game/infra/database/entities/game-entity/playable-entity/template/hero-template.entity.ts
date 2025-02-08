import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Relation,
  Unique,
} from "typeorm";
import {
  HeroClassType,
  HeroClassValues,
} from "../../../../enums/hero-class.enum";
import { CampaignStageEligibility } from "./campaign-stage-eligibility.entity";
import { PlayableEntityTemplate } from "./playable-entity-template.entity";

@Entity()
@Unique(["name", "class", "level"])
export class HeroTemplate extends PlayableEntityTemplate {
  @Column()
  readonly name: string;

  @Column({ type: "enum", enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;

  @ManyToMany(() => CampaignStageEligibility)
  @JoinTable()
  readonly campaignStage: Relation<CampaignStageEligibility>;
}
