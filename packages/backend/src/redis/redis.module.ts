import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { redisClientFactory } from "./redis.client.factory";
import { RedisService } from "./redis.service";
import { GamesRepository } from "./repositories/games.repository";
import { UsersRepository } from "./repositories/users.repository";

@Module({
  imports: [ConfigModule],
  providers: [
    redisClientFactory,
    RedisService,
    UsersRepository,
    GamesRepository,
  ],
  exports: [RedisService, UsersRepository, GamesRepository],
})
export class RedisModule {}
