import type { LobbyEntity } from "@dnd/shared";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { LobbyEvent } from "./lobby-events.enum";

export class UserLeftLobbyPayload
  implements EventPayload<LobbyEvent.UserLeftLobby>
{
  public readonly name = LobbyEvent.UserLeftLobby;
  public readonly userId: User["id"];
  public readonly lobby: LobbyEntity;

  constructor({ userId, lobby }: Omit<UserLeftLobbyPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
