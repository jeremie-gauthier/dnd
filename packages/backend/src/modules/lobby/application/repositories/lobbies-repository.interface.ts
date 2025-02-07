import { Lobby } from "../../domain/lobby/lobby.aggregate";
import { Config } from "../../infra/database/entities/config.entity";

export interface LobbyRepository {
  create(data: {
    config: Config;
    hostUserId: string;
  }): Promise<Lobby>;
  getOne(data: { lobbyId: Lobby["id"] }): Promise<Lobby | null>;
  getOneOrThrow(data: { lobbyId: Lobby["id"] }): Promise<Lobby>;
  getUserLobby(data: { userId: string }): Promise<Lobby | null>;
  getMany(): Promise<Lobby[]>;
  update(data: { lobby: Lobby }): Promise<void>;
  del(data: { lobbyId: Lobby["id"] }): Promise<void>;
}

export const LOBBY_REPOSITORY = Symbol("LobbyRepository");
