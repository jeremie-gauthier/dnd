import { LobbyEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class LobbyDeletedPayload
  implements EventPayload<LobbyEvent.LobbyDeleted>
{
  public readonly name = LobbyEvent.LobbyDeleted;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<LobbyDeletedPayload, "name">) {
    this.lobby = lobby;
  }
}
