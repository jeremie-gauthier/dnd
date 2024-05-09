import { LobbyEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { LobbyEvent } from "./lobby-events.enum";

export class DeleteLobbyPayload
  implements EventPayload<LobbyEvent.DeleteLobby>
{
  public readonly name = LobbyEvent.DeleteLobby;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<DeleteLobbyPayload, "name">) {
    this.lobby = lobby;
  }
}
