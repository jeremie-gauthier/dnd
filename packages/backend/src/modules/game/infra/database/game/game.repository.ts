import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from "@nestjs/common";
import { GameRepository } from "src/modules/game/application/repositories/game-repository.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { RedisService } from "src/redis/redis.service";
import { GamesRepository } from "../games.repository";
import { GameMapper } from "./mapper/game.mapper";
import { GamePersistence } from "./model/game.model";

@Injectable()
export class RedisGameRepository
  implements OnApplicationBootstrap, GameRepository
{
  public readonly client;
  public static KEY = "games";

  constructor(
    private readonly mapper: GameMapper,
    redisService: RedisService,
  ) {
    this.client = redisService.client;
  }

  public async onApplicationBootstrap() {
    const games = await this.client.json.get(GamesRepository.KEY);
    if (games === null) {
      await this.client.json.set(
        GamesRepository.KEY,
        RedisService.JSON_ROOT,
        {},
      );
    }
  }

  public async create({ game }: { game: Game }): Promise<Game> {
    await this.client.json.set(
      GamesRepository.KEY,
      game.id,
      this.mapper.toPersistence(game),
    );
    return game;
  }

  public async getOne({
    gameId,
  }: { gameId: Game["id"] }): Promise<Game | null> {
    const gameRaw = (await this.client.json.get(GamesRepository.KEY, {
      path: gameId,
    })) as GamePersistence | null;
    return gameRaw ? this.mapper.toDomain(gameRaw) : null;
  }

  public async getOneOrThrow({
    gameId,
  }: { gameId: Game["id"] }): Promise<Game> {
    const game = await this.getOne({ gameId });
    if (!game) {
      throw new NotFoundException("Game not found");
    }
    return game;
  }

  public async update({ game }: { game: Game }): Promise<void> {
    await this.client.json.set(
      GamesRepository.KEY,
      game.id,
      this.mapper.toPersistence(game),
    );
  }

  public async del({ gameId }: { gameId: Game["id"] }): Promise<void> {
    await this.client.json.del(GamesRepository.KEY, gameId);
  }
}