import { type LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LOBBIES_ROOM } from "src/lobby/constants";
import type { MessageContext } from "src/types/socket.type";
import { LobbyEvent } from "../../emitters/lobby-events.enum";
import type { LobbyCleanerRepository } from "./lobby-cleaner.repository";

@Injectable()
export class LobbyCleanerListener {
  constructor(private readonly repository: LobbyCleanerRepository) {}

  @OnEvent(LobbyEvent.UserLeftLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  public async handler({
    ctx,
    lobbyId,
  }: { ctx: MessageContext; lobbyId: LobbyEntity["id"] }) {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      return;
    }

    const hasNoPlayersLeft = lobby.players.length === 0;
    if (hasNoPlayersLeft) {
      await this.repository.delLobbyById(lobbyId);

      ctx.server.to(LOBBIES_ROOM).emit(ServerLobbyEvent.LobbiesDeleted, {
        lobbyId,
      });
    }
  }
}
