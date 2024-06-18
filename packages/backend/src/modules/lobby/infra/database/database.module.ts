import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { LOBBIES_REPOSITORY } from "../../application/repositories/lobbies-repository.interface";
import { USERS_REPOSITORY } from "../../application/repositories/users-repository.interface";
import { LobbiesMapper } from "./lobbies/lobbies.mapper";
import { RedisLobbiesRepository } from "./lobbies/lobbies.repository";
import { RedisUsersRepository } from "./users/users.repository";

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: LOBBIES_REPOSITORY,
      useClass: RedisLobbiesRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: RedisUsersRepository,
    },
    LobbiesMapper,
  ],
  exports: [
    {
      provide: LOBBIES_REPOSITORY,
      useClass: RedisLobbiesRepository,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: RedisUsersRepository,
    },
  ],
})
export class DatabaseModule {}
