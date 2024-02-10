import type { LobbyEntity } from '@dnd/shared';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import type { MessageContext } from 'src/types/socket.type';
import { LobbyEvent } from './lobby-events.enum';

export class LobbyChangedPayload implements EventPayload<LobbyEvent.LobbyChanged> {
  public readonly name = LobbyEvent.LobbyChanged;
  public readonly ctx: MessageContext;
  public readonly lobbyId: LobbyEntity['id'];

  constructor({ ctx, lobbyId }: Omit<LobbyChangedPayload, 'name'>) {
    this.ctx = ctx;
    this.lobbyId = lobbyId;
  }
}
