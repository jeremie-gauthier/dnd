import { ChildEntity } from "typeorm";
import { PlayableEntityFaction } from "../../../enums/playable-entity-faction.enum";
import { PlayableEntity } from "./playable-entity.entity";

@ChildEntity(PlayableEntityFaction.MONSTER)
export class MonsterEntity extends PlayableEntity {
  readonly faction = PlayableEntityFaction.MONSTER;
}
