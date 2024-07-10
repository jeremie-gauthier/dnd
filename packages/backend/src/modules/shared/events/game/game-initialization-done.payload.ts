import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { GameEvent } from "./game-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<GameEvent.GameInitializationDone>
{
  public readonly name = GameEvent.GameInitializationDone;
  public readonly lobby: ReturnType<Lobby["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ lobby, game }: Omit<GameInitializationDonePayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
