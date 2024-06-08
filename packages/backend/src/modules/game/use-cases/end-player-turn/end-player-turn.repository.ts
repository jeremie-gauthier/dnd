import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UsersRepository } from "src/redis/repositories/users.repository";
import { GamesRepository } from "../../infra/database/games.repository";

@Injectable()
export class EndPlayerTurnRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async getGameByUserId({
    userId,
  }: { userId: User["id"] }): Promise<GameEntity | null> {
    const gameId = await this.usersRepository.get(userId);
    if (!gameId) return null;

    const game = await this.gamesRepository.getOne(gameId);

    return game;
  }
}
