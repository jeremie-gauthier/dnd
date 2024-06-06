import { GameEntity, LobbyEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class GameReadyPayload implements EventPayload<LobbyEvent.GameReady> {
  public readonly name = LobbyEvent.GameReady;
  public readonly lobby: LobbyEntity;
  public readonly game: GameEntity;

  constructor({ lobby, game }: Omit<GameReadyPayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
