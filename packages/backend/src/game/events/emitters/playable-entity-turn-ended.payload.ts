import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityTurnEndedPayload
  implements EventPayload<GameEvent.PlayableEntityTurnEnded>
{
  public readonly name = GameEvent.PlayableEntityTurnEnded;
  public readonly ctx: MessageContext;
  public readonly entityId: PlayableEntity["id"];
  public readonly game: GameEntity;

  constructor({
    ctx,
    entityId,
    game,
  }: Omit<PlayableEntityTurnEndedPayload, "name">) {
    this.ctx = ctx;
    this.entityId = entityId;
    this.game = game;
  }
}
