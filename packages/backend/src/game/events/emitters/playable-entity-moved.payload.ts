import type { GameEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityMovedPayload
  implements EventPayload<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly game: GameEntity;

  constructor({ game }: Omit<PlayableEntityMovedPayload, "name">) {
    this.game = game;
  }
}
