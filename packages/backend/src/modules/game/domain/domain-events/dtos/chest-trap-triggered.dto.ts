import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { ChestTrap } from "../../item/chest-trap/chest-trap.abstract";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class ChestTrapTriggeredDomainEvent
  implements IDomainEvent<GameEvent.ChestTrapTriggered>
{
  public readonly name = GameEvent.ChestTrapTriggered;
  public readonly chestTrapItem: ReturnType<ChestTrap["toPlain"]>;
  public readonly subjectEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    chestTrapItem,
    subjectEntity,
  }: Omit<ChestTrapTriggeredDomainEvent, "name">) {
    this.chestTrapItem = chestTrapItem;
    this.subjectEntity = subjectEntity;
  }
}
