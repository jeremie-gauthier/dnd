import { HeroEntity as HeroEntityPersistence } from "../entities/game-entity/playable-entity/hero.entity";
import { MonsterEntity as MonsterEntityPersistence } from "../entities/game-entity/playable-entity/monster.entity";

export type PlayableEntityPersistence =
  | HeroEntityPersistence
  | MonsterEntityPersistence;
