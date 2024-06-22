import { LobbyView } from "@dnd/shared";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { Lobby } from "../../domain/lobby/lobby.aggregate";
import { LobbyPersistence } from "../../infra/database/lobbies/lobby.model";

export interface LobbiesRepository {
  create(data: {
    config: LobbyView["config"];
    heroes: Array<Hero>;
    hostUserId: User["id"];
  }): Promise<LobbyView>;
  getDomainOne(data: { lobbyId: Lobby["id"] }): Promise<Lobby | null>;
  getDomainOneOrThrow(data: { lobbyId: Lobby["id"] }): Promise<Lobby>;
  getViewOneOrThrow(data: {
    lobbyId: LobbyPersistence["id"];
  }): Promise<LobbyView>;
  getDomainMany(): Promise<Lobby[]>;
  getViewMany(): Promise<LobbyView[]>;
  update(data: { lobby: Lobby }): Promise<void>;
  del(data: { lobbyId: Lobby["id"] }): Promise<void>;
}

export const LOBBIES_REPOSITORY = Symbol("LobbiesRepository");
