import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../_move/playable/playable.entity";

export class PlayableEntityMovedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly playableEntity: Playable;

  constructor({
    playableEntity,
  }: Omit<PlayableEntityMovedDomainEvent, "name">) {
    this.playableEntity = playableEntity;
  }
}
