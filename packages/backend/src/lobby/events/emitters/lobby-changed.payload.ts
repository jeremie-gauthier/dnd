import type { LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { LobbyEvent } from "./lobby-events.enum";

export class LobbyUpdatedPayload
  implements EventPayload<LobbyEvent.LobbyUpdated>
{
  public readonly name = LobbyEvent.LobbyUpdated;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<LobbyUpdatedPayload, "name">) {
    this.lobby = lobby;
  }
}
