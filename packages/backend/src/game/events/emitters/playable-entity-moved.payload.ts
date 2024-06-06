import type { GameEntity, PlayableEntity } from "@dnd/shared";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { GameEvent } from "./game-events.enum";

export class PlayableEntityMovedPayload
  implements EventPayload<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly game: GameEntity;
  public readonly playableEntity: PlayableEntity;

  constructor({
    game,
    playableEntity,
  }: Omit<PlayableEntityMovedPayload, "name">) {
    this.game = game;
    this.playableEntity = playableEntity;
  }
}
