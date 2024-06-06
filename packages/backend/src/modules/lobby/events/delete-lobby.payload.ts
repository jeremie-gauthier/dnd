import { LobbyEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class DeleteLobbyPayload
  implements EventPayload<LobbyEvent.DeleteLobby>
{
  public readonly name = LobbyEvent.DeleteLobby;
  public readonly lobby: LobbyEntity;

  constructor({ lobby }: Omit<DeleteLobbyPayload, "name">) {
    this.lobby = lobby;
  }
}
