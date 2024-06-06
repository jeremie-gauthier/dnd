import type { GameEntity, LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { GameEvent } from "./game-event.enum";

export class GameInitializationDonePayload
  implements EventPayload<GameEvent.GameInitializationDone>
{
  public readonly name = GameEvent.GameInitializationDone;
  public readonly lobby: LobbyEntity;
  public readonly game: GameEntity;

  constructor({ lobby, game }: Omit<GameInitializationDonePayload, "name">) {
    this.lobby = lobby;
    this.game = game;
  }
}
