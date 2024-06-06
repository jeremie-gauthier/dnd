import type { LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { GameEvent } from "./game-event.enum";

export class GameInitializationStartedPayload
  implements EventPayload<GameEvent.GameInitializationStarted>
{
  public readonly name = GameEvent.GameInitializationStarted;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<GameInitializationStartedPayload, "name">) {
    this.lobby = lobby;
  }
}
