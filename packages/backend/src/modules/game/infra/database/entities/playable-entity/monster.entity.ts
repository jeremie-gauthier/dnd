import { PlayableEntityFaction } from "src/database/enums/playable-entity-faction.enum";
import { PlayableEntity } from "./playable-entity.entity";

export class MonsterEntity extends PlayableEntity {
  readonly faction = PlayableEntityFaction.MONSTER;
}
