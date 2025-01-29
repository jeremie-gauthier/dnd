import { HeroClassType } from "src/database/enums/hero-class.enum";
import { PlayableEntityFaction } from "src/database/enums/playable-entity-faction.enum";
import { PlayableEntity } from "./playable-entity.entity";

export class HeroEntity extends PlayableEntity {
  readonly faction = PlayableEntityFaction.HERO;

  class: HeroClassType;

  level: number;
}
