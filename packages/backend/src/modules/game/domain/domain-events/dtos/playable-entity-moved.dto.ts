import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class PlayableEntityMovedDomainEvent
  implements IDomainEvent<GameEvent.PlayableEntityMoved>
{
  public readonly name = GameEvent.PlayableEntityMoved;
  public readonly playableEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    playableEntity,
  }: { playableEntity: ReturnType<Playable["toPlain"]> }) {
    this.playableEntity = playableEntity;
  }
}
