import type { LobbyView } from "@dnd/shared";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { LobbyEvent } from "./lobby-event.enum";

export class UserLeftLobbyPayload
  implements EventPayload<LobbyEvent.UserLeftLobby>
{
  public readonly name = LobbyEvent.UserLeftLobby;
  public readonly userId: User["id"];
  public readonly lobby: LobbyView;

  constructor({ userId, lobby }: Omit<UserLeftLobbyPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
