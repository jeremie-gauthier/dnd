import { ChildEntity, Column } from "typeorm";
import { PlayableEntityFaction } from "../../enums/playable-entity-faction.enum";
import { PlayableEntity } from "./playable-entity.entity";

@ChildEntity()
export class MonsterEntity extends PlayableEntity {
  @Column({ default: PlayableEntityFaction.MONSTER, update: false })
  readonly faction = PlayableEntityFaction.MONSTER;
}
