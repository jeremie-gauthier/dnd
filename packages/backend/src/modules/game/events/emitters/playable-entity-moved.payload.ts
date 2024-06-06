import type { GameEntity, PlayableEntity } from "@dnd/shared";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

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
