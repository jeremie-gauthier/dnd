import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { redisClientFactory } from "./redis.client.factory";
import { RedisService } from "./redis.service";
import { UsersRepository } from "./repositories/users.repository";

@Module({
  imports: [ConfigModule],
  providers: [redisClientFactory, RedisService, UsersRepository],
  exports: [RedisService, UsersRepository],
})
export class RedisModule {}
