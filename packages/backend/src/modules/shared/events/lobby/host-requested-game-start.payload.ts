import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import { LobbyEvent } from "./lobby-event.enum";

export class HostRequestedGameStartPayload
  implements EventPayload<LobbyEvent.HostRequestedGameStart>
{
  public readonly name = LobbyEvent.HostRequestedGameStart;
  public readonly userId: User["id"];
  public readonly lobby: ReturnType<Lobby["toPlain"]>;

  constructor({ userId, lobby }: Omit<HostRequestedGameStartPayload, "name">) {
    this.userId = userId;
    this.lobby = lobby;
  }
}
