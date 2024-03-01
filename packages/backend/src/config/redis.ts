import { registerAs } from "@nestjs/config";
import { RedisClientOptions } from "redis";

// TODO: create a username and a pwd before going live
const config: RedisClientOptions = {};

export default registerAs("redis", () => config);
