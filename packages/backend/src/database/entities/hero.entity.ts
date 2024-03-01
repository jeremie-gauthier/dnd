import { HeroClassType, HeroClassValues } from "@dnd/shared";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { CampaignProgression } from "./campaign-progression.entity";
import { PlayableEntity } from "./playable-entity";

@Entity()
export class Hero extends PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(
    () => CampaignProgression,
    (campaignProgression) => campaignProgression.heroes,
    {
      onDelete: "CASCADE",
      nullable: false,
    },
  )
  readonly campaignProgression: Relation<CampaignProgression>;

  @Column()
  readonly name: string;

  @Column({ type: "enum", enum: HeroClassValues })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;
}
