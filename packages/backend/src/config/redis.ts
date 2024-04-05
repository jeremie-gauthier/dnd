import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import type { RedisClientOptions } from "redis";

dotenvConfig({ path: ".env" });

// TODO: create a username and a pwd before going live
const config: RedisClientOptions = {
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
};

export default registerAs("redis", () => config);
