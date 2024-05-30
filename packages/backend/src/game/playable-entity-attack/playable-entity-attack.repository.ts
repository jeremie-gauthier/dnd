import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/redis/repositories/games.repository";

@Injectable()
export class PlayableEntityAttackRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async getGameById({
    gameId,
  }: { gameId: GameEntity["id"] }): Promise<GameEntity | null> {
    return await this.gamesRepository.getOne(gameId);
  }
}
