import { GameEntity } from '@dnd/shared';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import { MessageContext } from 'src/types/socket.type';
import { GameEvent } from './game-events.enum';

export class GameChangedPayload implements EventPayload<GameEvent.GameChanged> {
  public readonly name = GameEvent.GameChanged;
  public readonly ctx: MessageContext;
  public readonly gameId: GameEntity['id'];

  constructor({ ctx, gameId }: Omit<GameChangedPayload, 'name'>) {
    this.ctx = ctx;
    this.gameId = gameId;
  }
}
