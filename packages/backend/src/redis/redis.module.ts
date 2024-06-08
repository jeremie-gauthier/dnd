import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { redisClientFactory } from "./redis.client.factory";
import { RedisService } from "./redis.service";

@Module({
  imports: [ConfigModule],
  providers: [redisClientFactory, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
