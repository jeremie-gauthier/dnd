import type { GameEntity } from "@dnd/shared";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { GameEvent } from "./game-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<GameEvent.GameInitializationDone>
{
  public readonly name = GameEvent.GameInitializationDone;
  public readonly lobby: Lobby;
  public readonly game: GameEntity;

  constructor({ lobby, game }: Omit<GameInitializationDonePayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
