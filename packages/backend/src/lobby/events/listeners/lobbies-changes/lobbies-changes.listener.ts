import { ServerLobbyEvent } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LOBBIES_ROOM } from 'src/lobby/constants';
import { LobbyEvent } from '../../emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from '../../emitters/user-joined-lobby.payload';
import { LobbiesChangesRepository } from './lobbies-changes.repository';

@Injectable()
export class LobbiesChangesListener {
  constructor(private readonly repository: LobbiesChangesRepository) {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  public async handler({ ctx, lobbyId }: UserJoinedLobbyPayload) {
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
