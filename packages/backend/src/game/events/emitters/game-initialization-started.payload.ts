import type { LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class GameInitializationStartedPayload
  implements EventPayload<GameEvent.GameInitializationStarted>
{
  public readonly name = GameEvent.GameInitializationStarted;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<GameInitializationStartedPayload, "name">) {
    this.lobby = lobby;
  }
}
