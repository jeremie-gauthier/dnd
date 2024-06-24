import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "../../../infra/database/games.repository";

@Injectable()
export class DeleteGameRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async deleteGame({
    gameId,
  }: { gameId: GameEntity["id"] }): Promise<void> {
    await this.gamesRepository.del(gameId);
  }
}
