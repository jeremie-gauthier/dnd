import { GameEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { GamesRepository } from 'src/redis/repositories/games.repository';

@Injectable()
export class ChangePositionRepository {
  constructor(private readonly gamesRepository: GamesRepository) {}

  public async getGameById(gameId: GameEntity['id']): Promise<GameEntity | null> {
    return await this.gamesRepository.getOne(gameId);
  }

  public async updateGame(game: GameEntity): Promise<void> {
    await this.gamesRepository.update(game);
  }
}
