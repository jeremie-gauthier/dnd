import { GameEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LobbyEvent } from "./lobby-event.enum";

export class GameReadyPayload implements EventPayload<LobbyEvent.GameReady> {
  public readonly name = LobbyEvent.GameReady;
  public readonly lobby: Lobby;
  public readonly game: GameEntity;

  constructor({ lobby, game }: Omit<GameReadyPayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
