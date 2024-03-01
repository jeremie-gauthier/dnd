import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisService } from "./redis.service";
import { GamesRepository } from "./repositories/games.repository";
import { LobbiesRepository } from "./repositories/lobbies.repository";
import { UsersRepository } from "./repositories/users.repository";

@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    LobbiesRepository,
    UsersRepository,
    GamesRepository,
  ],
  exports: [LobbiesRepository, UsersRepository, GamesRepository],
})
export class RedisModule {}
