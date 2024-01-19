import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LOBBIES_ROOM } from 'src/lobby/constants';
import { MessageContext } from 'src/types/socket.type';
import { LobbyEvent } from '../../emitters/lobby-events.enum';

type EventNames =
  | LobbyEvent.UserJoinedLobby
  | LobbyEvent.UserLeftLobby
  | LobbyEvent.UserForceLeftLobby;

@Injectable()
export class RoomManagerListener {
  constructor() {}

  @OnEvent(LobbyEvent.UserJoinedLobby)
  @OnEvent(LobbyEvent.UserLeftLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  public async handler({
    name,
    ctx,
    lobbyId,
  }: {
    name: EventNames;
    ctx: MessageContext;
    lobbyId: LobbyEntity['id'];
  }) {
    if (this.hasJoinedALobby(name)) {
      await ctx.client.leave(LOBBIES_ROOM);
      await ctx.client.join(lobbyId);
    } else {
      await ctx.client.leave(lobbyId);
    }
  }

  private hasJoinedALobby(name: EventNames): boolean {
    return name === LobbyEvent.UserJoinedLobby;
  }
}
