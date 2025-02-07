import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LOBBY_REPOSITORY } from "../../application/repositories/lobbies-repository.interface";
import { Lobby } from "./entities/lobby.entity";
import { PlayableCharacter } from "./entities/playable-character.entity";
import { LobbyMapper } from "./mappers/lobby.mapper";
import { LobbiesPostgresRepository } from "./repositories/lobby.repository";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Lobby, PlayableCharacter])],
  providers: [
    {
      provide: LOBBY_REPOSITORY,
      useClass: LobbiesPostgresRepository,
    },
    LobbyMapper,
  ],
  exports: [
    {
      provide: LOBBY_REPOSITORY,
      useClass: LobbiesPostgresRepository,
    },
  ],
})
export class DatabaseModule {}
