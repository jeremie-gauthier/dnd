import type { LobbyEntity } from "@dnd/shared";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { LobbyEvent } from "./lobby-event.enum";

export class HostRequestedGameStartPayload
  implements EventPayload<LobbyEvent.HostRequestedGameStart>
{
  public readonly name = LobbyEvent.HostRequestedGameStart;
  public readonly userId: User["id"];
  public readonly lobby: LobbyEntity;

  constructor({ userId, lobby }: Omit<HostRequestedGameStartPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
