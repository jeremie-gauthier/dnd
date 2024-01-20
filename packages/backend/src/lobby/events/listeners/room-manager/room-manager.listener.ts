import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LOBBIES_ROOM } from 'src/lobby/constants';
import { LobbyEvent } from '../../emitters/lobby-events.enum';
import type { RoomManagerEventNames, RoomManagerEventPayloads } from './room-manager.type';

@Injectable()
export class RoomManagerListener {
  constructor() {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  public async handler({ name, ctx, lobbyId }: RoomManagerEventPayloads) {
    if (this.isAJoinLobbyEvent(name)) {
      await ctx.client.leave(LOBBIES_ROOM);
      await ctx.client.join(lobbyId);
    } else {
      await ctx.client.leave(lobbyId);
    }
  }

  private isAJoinLobbyEvent(name: RoomManagerEventNames): boolean {
    return name === LobbyEvent.UserJoinedLobby;
  }
}
