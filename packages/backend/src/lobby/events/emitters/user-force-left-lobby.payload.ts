import type { LobbyEntity } from "@dnd/shared";
import type { User } from "src/database/entities/user.entity";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import type { MessageContext } from "src/types/socket.type";
import { LobbyEvent } from "./lobby-events.enum";

export class UserForceLeftLobbyPayload
  implements EventPayload<LobbyEvent.UserForceLeftLobby>
{
  public readonly name = LobbyEvent.UserForceLeftLobby;
  public readonly ctx: MessageContext;
  public readonly userId: User["id"];
  public readonly lobbyId: LobbyEntity["id"];

  constructor({
    ctx,
    userId,
    lobbyId,
  }: Omit<UserForceLeftLobbyPayload, "name">) {
    this.ctx = ctx;
    this.userId = userId;
    this.lobbyId = lobbyId;
  }
}
