import type { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/redis/repositories/games.repository";

@Injectable()
export class GamePreparationPhaseRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async saveGame(game: GameEntity): Promise<GameEntity> {
    return await this.gamesRepository.set(game);
  }
}
