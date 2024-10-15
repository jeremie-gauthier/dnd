import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Trap } from "../../tile/tile-entity/interactive/trap.entity";

export class TrapTriggeredDomainEvent
  implements IDomainEvent<GameEvent.TrapTriggered>
{
  public readonly name = GameEvent.TrapTriggered;
  public readonly trapEntity: ReturnType<Trap["toPlain"]>;
  public readonly subjectEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    trapEntity,
    subjectEntity,
  }: {
    trapEntity: ReturnType<Trap["toPlain"]>;
    subjectEntity: ReturnType<Playable["toPlain"]>;
  }) {
    this.trapEntity = trapEntity;
    this.subjectEntity = subjectEntity;
  }
}
