import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LobbyEvent } from "./lobby-event.enum";

export class HostRequestedGameStartPayload
  implements EventPayload<LobbyEvent.HostRequestedGameStart>
{
  public readonly name = LobbyEvent.HostRequestedGameStart;
  public readonly userId: User["id"];
  public readonly lobby: Lobby;

  constructor({ userId, lobby }: Omit<HostRequestedGameStartPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
