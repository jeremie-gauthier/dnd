import { LobbyEntity, ServerLobbyEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LOBBIES_ROOM } from "src/lobby/constants";
import { MessageContext } from "src/types/socket.type";
import { LobbyEvent } from "../../emitters/lobby-events.enum";
import { LobbiesChangesRepository } from "./lobbies-changes.repository";

@Injectable()
export class LobbiesChangesListener {
  constructor(private readonly repository: LobbiesChangesRepository) {}

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

    ctx.server.to(LOBBIES_ROOM).emit(ServerLobbyEvent.LobbiesChangesDetected, {
      lobby: {
        ...lobby,
        nbPlayers: lobby.players.length,
      },
    });
  }
}
