import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { GamesRepository } from "./games.repository";

@Module({
  imports: [RedisModule],
  providers: [GamesRepository],
  exports: [GamesRepository],
})
export class DatabaseModule {}
