import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "../game-event.enum";

export class DoorOpenedDomainEvent
  implements IDomainEvent<GameEvent.DoorOpened>
{
  public readonly name = GameEvent.DoorOpened;
  public readonly entityThatOpenedTheDoor: ReturnType<Playable["toPlain"]>;

  constructor({
    entityThatOpenedTheDoor,
  }: Omit<DoorOpenedDomainEvent, "name">) {
    this.entityThatOpenedTheDoor = entityThatOpenedTheDoor;
  }
}
