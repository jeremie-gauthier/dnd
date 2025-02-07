import { Hero as HeroDomain } from "../../domain/playable-entities/playable-entity/heroes/hero.abstract";

export interface HeroRepository {
  getOneOrThrow(data: { heroId: string }): Promise<HeroDomain>;
}

export const HERO_REPOSITORY = Symbol("HeroRepository");
