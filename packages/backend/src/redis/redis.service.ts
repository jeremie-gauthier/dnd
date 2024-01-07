import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { REDIS_LOBBIES_KEY } from 'src/lobby/constants';

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
  public readonly client;
  public static readonly JSON_ROOT = '$';

  constructor(private readonly configService: ConfigService) {
    const redisOptions = configService.getOrThrow('redis');
    this.client = createClient(redisOptions);
  }

  public async onApplicationBootstrap() {
    await this.connect();

    const env = this.configService.get('NODE_ENV');
    if (env === 'development') {
      // await this.client.flushAll();
    }

    await this.initDataStructures();
  }

  public async onApplicationShutdown() {
    await this.disconnect();
  }

  public async connect() {
    await this.client.connect();
  }

  public async disconnect() {
    await this.client.disconnect();
  }

  public async initDataStructures() {
    const lobbies = await this.client.json.get(REDIS_LOBBIES_KEY);
    if (lobbies === null) {
      await this.client.json.set(REDIS_LOBBIES_KEY, RedisService.JSON_ROOT, []);
    }
  }
}
