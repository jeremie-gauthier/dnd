import { Hero as HeroDomain } from "../../domain/playable-entities/playable-entity/heroes/hero.abstract";

export interface GameProgressionRepository {
  getHeroes(data: {
    campaignId: string;
    userId: string;
  }): Promise<Array<HeroDomain>>;
}

export const GAME_PROGRESSION_REPOSITORY = Symbol("GameProgressionRepository");
