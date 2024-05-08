import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityTurnEndedPayload
  implements EventPayload<GameEvent.PlayableEntityTurnEnded>
{
  public readonly name = GameEvent.PlayableEntityTurnEnded;
  public readonly entityId: PlayableEntity["id"];
  public readonly game: GameEntity;

  constructor({
    entityId,
    game,
  }: Omit<PlayableEntityTurnEndedPayload, "name">) {
    this.entityId = entityId;
    this.game = game;
  }
}
