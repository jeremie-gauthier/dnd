import {
  Injectable,
  type OnApplicationShutdown,
  type OnModuleInit,
} from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  public readonly client;
  public static readonly JSON_ROOT = "$";

  constructor(private readonly configService: ConfigService) {
    const redisOptions = configService.getOrThrow("redis");
    this.client = createClient(redisOptions);
  }

  public async onModuleInit() {
    await this.client.connect();

    const env = this.configService.get("NODE_ENV");
    if (env === "development") {
      await this.client.flushAll();
    }
  }

  public async onApplicationShutdown() {
    await this.client.disconnect();
  }
}
