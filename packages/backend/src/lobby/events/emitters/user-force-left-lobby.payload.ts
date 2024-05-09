import type { LobbyEntity } from "@dnd/shared";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import { LobbyEvent } from "./lobby-events.enum";

export class UserForceLeftLobbyPayload
  implements EventPayload<LobbyEvent.UserForceLeftLobby>
{
  public readonly name = LobbyEvent.UserForceLeftLobby;
  public readonly userId: User["id"];
  public readonly lobby: LobbyEntity;

  constructor({ userId, lobby }: Omit<UserForceLeftLobbyPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
