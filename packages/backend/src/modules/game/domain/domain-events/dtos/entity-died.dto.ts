import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class EntityDiedDomainEvent
  implements IDomainEvent<GameEvent.EntityDied>
{
  public readonly name = GameEvent.EntityDied;
  public readonly target: ReturnType<Playable["toPlain"]>;

  constructor({
    target,
  }: {
    target: ReturnType<Playable["toPlain"]>;
  }) {
    this.target = target;
  }
}
