import { LobbyEntity } from "@dnd/shared";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { Lobby } from "../../domain/lobby/lobby.aggregate";
import { LobbyPersistence } from "../../infra/database/lobbies/lobby.model";

export interface LobbiesRepository {
  create(data: {
    config: LobbyEntity["config"];
    heroes: Array<Hero>;
    hostUserId: User["id"];
  }): Promise<LobbyEntity>;
  getDomainOne(data: { lobbyId: Lobby["id"] }): Promise<Lobby | null>;
  getDomainOneOrThrow(data: { lobbyId: Lobby["id"] }): Promise<Lobby>;
  getViewOneOrThrow(data: {
    lobbyId: LobbyPersistence["id"];
  }): Promise<LobbyEntity>;
  getDomainMany(): Promise<Lobby[]>;
  getViewMany(): Promise<LobbyEntity[]>;
  update(data: { lobby: Lobby }): Promise<void>;
  del(data: { lobbyId: Lobby["id"] }): Promise<void>;
}

export const LOBBIES_REPOSITORY = Symbol("LobbiesRepository");
