import type { GameView } from "@dnd/shared";
import { Injectable, type OnApplicationBootstrap } from "@nestjs/common";
import { RedisService } from "../../../../redis/redis.service";

type GamesKey = Record<GameView["id"], GameView>;

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

  public async getMany(): Promise<GameView[]> {
    const games = (await this.client.json.get(GamesRepository.KEY)) as GamesKey;
    return Object.values(games);
  }

  public async getOne(path: string | string[]): Promise<GameView | null> {
    return (await this.client.json.get(GamesRepository.KEY, {
      path,
    })) as GameView | null;
  }

  public async set(game: GameView): Promise<GameView> {
    await this.client.json.set(GamesRepository.KEY, game.id, game);
    return game;
  }

  public async update(updatedGame: GameView): Promise<void> {
    await this.client.json.set(
      GamesRepository.KEY,
      updatedGame.id,
      updatedGame,
    );
  }

  public async del(gameId: GameView["id"]): Promise<void> {
    await this.client.json.del(GamesRepository.KEY, gameId);
  }
}
