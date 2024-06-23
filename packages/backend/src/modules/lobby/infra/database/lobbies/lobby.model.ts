import { LobbyView } from "@dnd/shared";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LobbiesMapper } from "./lobbies.mapper";

export type ILobbyPersistence = {
  id: string;
  status: "OPENED" | "GAME_INITIALIZING" | "GAME_STARTED";
  host: {
    userId: string;
  };
  config: {
    nbPlayersMax: number;
    campaign: {
      id: string;
      title: string;
      nbStages: number;
      stage: {
        id: string;
        title: string;
        intro: string;
        outro: string;
        order: number;
      };
    };
  };
  players: Array<{
    userId: string;
    isReady: boolean;
  }>;
  playableCharacters: Array<{
    id: string;
    type: "game_master" | "hero";
    pickedBy?: string;
  }>;
};

export class LobbyPersistence {
  constructor(
    private readonly _data: ILobbyPersistence,
    private readonly mapper: LobbiesMapper,
  ) {}

  public toDomain(): Lobby {
    return this.mapper.toDomain(this._data);
  }

  public toView(): LobbyView {
    return this.mapper.toView(this._data);
  }
}
