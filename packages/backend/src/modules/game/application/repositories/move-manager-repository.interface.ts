import { Move as MoveDomain } from "../../domain/_move/move.aggregate";

export interface MoveManagerRepository {
  getOneOrThrow(data: { gameId: string }): Promise<MoveDomain>;
  update(data: { game: MoveDomain }): Promise<void>;
}

export const MOVE_MANAGER_REPOSITORY = Symbol("MoveManagerRepository");
