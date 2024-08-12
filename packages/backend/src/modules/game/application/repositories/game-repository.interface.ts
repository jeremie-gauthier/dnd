import { Game } from "../../domain/game/game.aggregate";

export interface GameRepository {
  create(data: { game: Game }): Promise<Game>;
  getOne(data: { gameId: Game["id"] }): Promise<Game | null>;
  getOneOrThrow(data: { gameId: Game["id"] }): Promise<Game>;
  update(data: { game: Game }): Promise<void>;
  del(data: { gameId: Game["id"] }): Promise<void>;
}

export const GAME_REPOSITORY = Symbol("GameRepository");
