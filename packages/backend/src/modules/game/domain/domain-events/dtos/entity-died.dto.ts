import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class EntityDiedDomainEvent
  implements IDomainEvent<GameEvent.EntityDied>
{
  public readonly name = GameEvent.EntityDied;
  public readonly target: ReturnType<Playable["toPlain"]>;

  constructor({ target }: Omit<EntityDiedDomainEvent, "name">) {
    this.target = target;
  }
}
