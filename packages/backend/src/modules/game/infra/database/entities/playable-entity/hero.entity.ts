import { ChildEntity, Column, ManyToOne, Relation } from "typeorm";
import { HeroClassType, HeroClassValues } from "../../enums/hero-class.enum";
import { PlayableEntityFaction } from "../../enums/playable-entity-faction.enum";
import { GameProgression } from "../game-progression.entity";
import { PlayableEntity } from "./playable-entity.entity";

@ChildEntity()
export class HeroEntity extends PlayableEntity {
  @Column({ default: PlayableEntityFaction.HERO, update: false })
  override readonly faction = PlayableEntityFaction.HERO;

  @Column({
    type: "enum",
    enum: HeroClassValues,
    enumName: "HeroClass",
    nullable: false,
  })
  readonly class: HeroClassType;

  @Column()
  readonly level: number;

  @ManyToOne(() => GameProgression, { onDelete: "CASCADE", nullable: false })
  readonly gameProgression: Relation<GameProgression>;
}
