import {
  Inject,
  Injectable,
  type OnApplicationShutdown,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnApplicationShutdown {
  public static readonly JSON_ROOT = "$";

  constructor(
    private readonly configService: ConfigService,
    @Inject("RedisClient")
    public readonly client: ReturnType<typeof createClient>,
  ) {}

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
