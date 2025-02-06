import { Game as GameDomain } from "../../domain/game/game.aggregate";

export interface GameRepository {
  create(data: { game: GameDomain }): Promise<GameDomain>;
  getOne(data: { gameId: string }): Promise<GameDomain | null>;
  getOneOrThrow(data: { gameId: string }): Promise<GameDomain>;
  update(data: { game: GameDomain }): Promise<void>;
  del(data: { gameId: string }): Promise<void>;
}

export const GAME_REPOSITORY = Symbol("GameRepository");
