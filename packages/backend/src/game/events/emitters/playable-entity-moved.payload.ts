import type { GameEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import type { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityMovedPayload
  implements EventPayload<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly ctx: MessageContext;
  public readonly game: GameEntity;

  constructor({ ctx, game }: Omit<PlayableEntityMovedPayload, "name">) {
    this.ctx = ctx;
    this.game = game;
  }
}
