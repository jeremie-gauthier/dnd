import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Trap } from "../../tile/tile-entity/interactive/trap.entity";
import { GameEvent } from "../game-event.enum";

export class TrapTriggeredDomainEvent
  implements IDomainEvent<GameEvent.TrapTriggered>
{
  public readonly name = GameEvent.TrapTriggered;
  public readonly trapEntity: ReturnType<Trap["toPlain"]>;
  public readonly subjectEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    trapEntity,
    subjectEntity,
  }: Omit<TrapTriggeredDomainEvent, "name">) {
    this.trapEntity = trapEntity;
    this.subjectEntity = subjectEntity;
  }
}
