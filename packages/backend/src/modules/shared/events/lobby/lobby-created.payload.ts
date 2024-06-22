import { LobbyEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class LobbyCreatedPayload
  implements EventPayload<LobbyEvent.LobbyCreated>
{
  public readonly name = LobbyEvent.LobbyCreated;
  public readonly lobby: LobbyEntity;
  public readonly userId: string;

  constructor({ lobby, userId }: Omit<LobbyCreatedPayload, "name">) {
    this.lobby = lobby;
    this.userId = userId;
  }
}
