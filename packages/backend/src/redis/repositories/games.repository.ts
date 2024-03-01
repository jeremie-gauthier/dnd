import type { GameEntity } from "@dnd/shared";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { RedisService } from "../redis.service";

type GamesKey = Record<GameEntity["id"], GameEntity>;

@Injectable()
export class GamesRepository implements OnApplicationBootstrap {
  public readonly client;
  public static KEY = "games";

  constructor(redisService: RedisService) {
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

  public async getMany(): Promise<GameEntity[]> {
    const games = (await this.client.json.get(GamesRepository.KEY)) as GamesKey;
    return Object.values(games);
  }

  public async getOne(path: string | string[]): Promise<GameEntity | null> {
    return (await this.client.json.get(GamesRepository.KEY, {
      path,
    })) as GameEntity | null;
  }

  public async set(game: GameEntity): Promise<GameEntity> {
    await this.client.json.set(GamesRepository.KEY, game.id, game);
    return game;
  }

  public async update(updatedGame: GameEntity): Promise<void> {
    await this.client.json.set(
      GamesRepository.KEY,
      updatedGame.id,
      updatedGame,
    );
  }

  public async del(gameId: GameEntity["id"]): Promise<void> {
    await this.client.json.del(GamesRepository.KEY, gameId);
  }
}
