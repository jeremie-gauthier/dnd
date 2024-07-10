import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LobbyEvent } from "./lobby-event.enum";

export class GameReadyPayload implements EventPayload<LobbyEvent.GameReady> {
  public readonly name = LobbyEvent.GameReady;
  public readonly lobby: ReturnType<Lobby["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ lobby, game }: Omit<GameReadyPayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
