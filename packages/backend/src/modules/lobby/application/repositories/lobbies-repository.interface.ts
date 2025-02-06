import { LobbyView } from "@dnd/shared";
import { HeroEntity } from "src/modules/game/infra/database/entities/playable-entity/hero.entity";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { Lobby } from "../../domain/lobby/lobby.aggregate";

export interface LobbiesRepository {
  create(data: {
    config: LobbyView["config"];
    heroes: Array<HeroEntity>;
    hostUserId: User["id"];
  }): Promise<Lobby>;
  getOne(data: { lobbyId: Lobby["id"] }): Promise<Lobby | null>;
  getOneOrThrow(data: { lobbyId: Lobby["id"] }): Promise<Lobby>;
  getMany(): Promise<Lobby[]>;
  update(data: { lobby: Lobby }): Promise<void>;
  del(data: { lobbyId: Lobby["id"] }): Promise<void>;
}

export const LOBBIES_REPOSITORY = Symbol("LobbiesRepository");
