import type { LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import { LobbyEvent } from "./lobby-events.enum";

export class LobbyChangedPayload
  implements EventPayload<LobbyEvent.LobbyChanged>
{
  public readonly name = LobbyEvent.LobbyChanged;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<LobbyChangedPayload, "name">) {
    this.lobby = lobby;
  }
}
