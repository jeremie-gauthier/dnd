import { HeroEntity as HeroEntityPersistence } from "../entities/playable-entity/hero.entity";
import { MonsterEntity as MonsterEntityPersistence } from "../entities/playable-entity/monster.entity";

export type PlayableEntityPersistence =
  | HeroEntityPersistence
  | MonsterEntityPersistence;
