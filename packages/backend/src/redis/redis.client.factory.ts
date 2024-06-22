import { FactoryProvider } from "@nestjs/common";
import { createClient, type RedisClientOptions } from "redis";

export const redisClientFactory: FactoryProvider<
  ReturnType<typeof createClient>
> = {
  provide: "RedisClient",
  useFactory: () => {
    const config: RedisClientOptions = {
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    };

    const redisInstance = createClient(config);

    return redisInstance;
  },
  inject: [],
};
