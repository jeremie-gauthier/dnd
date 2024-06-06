import type { LobbyEntity } from "@dnd/shared";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class UserJoinedLobbyPayload
  implements EventPayload<LobbyEvent.UserJoinedLobby>
{
  public readonly name = LobbyEvent.UserJoinedLobby;
  public readonly userId: User["id"];
  public readonly lobby: LobbyEntity;

  constructor({ userId, lobby }: Omit<UserJoinedLobbyPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
