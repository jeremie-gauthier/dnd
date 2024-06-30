import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { GAME_REPOSITORY } from "../../application/repositories/game-repository.interface";
import { RedisGameRepository } from "./game/game.repository";

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: GAME_REPOSITORY,
      useClass: RedisGameRepository,
    },
  ],
  exports: [
    {
      provide: GAME_REPOSITORY,
      useClass: RedisGameRepository,
    },
  ],
})
export class DatabaseModule {}
