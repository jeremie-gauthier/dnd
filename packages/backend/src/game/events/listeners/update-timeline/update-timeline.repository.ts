import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { GamesRepository } from "src/redis/repositories/games.repository";

@Injectable()
export class UpdateTimelineRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async updateGame({ game }: { game: GameEntity }): Promise<void> {
    await this.gamesRepository.update(game);
  }
}
