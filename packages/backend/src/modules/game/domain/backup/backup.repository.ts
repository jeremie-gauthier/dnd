import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "../../infra/database/games.repository";

@Injectable()
export class BackupRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public getGame({ gameId }: { gameId: GameEntity["id"] }) {
    return this.gamesRepository.getOne(gameId);
  }

  public async updateGame({ game }: { game: GameEntity }) {
    await this.gamesRepository.update(game);
  }
}
