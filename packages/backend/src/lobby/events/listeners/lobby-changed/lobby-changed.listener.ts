import { ServerLobbyEvent, type LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { MessageContext } from "src/types/socket.type";
import { LobbyEvent } from "../../emitters/lobby-events.enum";
import { LobbyChangedRepository } from "./lobby-changed.repository";

@Injectable()
export class LobbyChangedListener {
  constructor(private readonly repository: LobbyChangedRepository) {}

  @OnEvent(LobbyEvent.LobbyChanged)
  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  public async handler({
    ctx,
    lobbyId,
  }: { ctx: MessageContext; lobbyId: LobbyEntity["id"] }) {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      return;
    }

    ctx.server.to(lobbyId).emit(ServerLobbyEvent.LobbyChangesDetected, {
      lobby,
    });
  }
}
