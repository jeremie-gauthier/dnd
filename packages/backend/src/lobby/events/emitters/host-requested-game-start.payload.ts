import { LobbyEntity } from '@dnd/shared';
import type { User } from 'src/database/entities/user.entity';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import type { MessageContext } from 'src/types/socket.type';
import { LobbyEvent } from './lobby-events.enum';

export class HostRequestedGameStartPayload
  implements EventPayload<LobbyEvent.HostRequestedGameStart>
{
  public readonly name = LobbyEvent.HostRequestedGameStart;
  public readonly ctx: MessageContext;
  public readonly lobby: LobbyEntity;
  public readonly userId: User['id'];

  constructor({ ctx, lobby, userId }: Omit<HostRequestedGameStartPayload, 'name'>) {
    this.ctx = ctx;
    this.lobby = lobby;
    this.userId = userId;
  }
}
