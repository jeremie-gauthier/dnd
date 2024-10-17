import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";

export class DoorOpenedDomainEvent
  implements IDomainEvent<GameEvent.DoorOpened>
{
  public readonly name = GameEvent.DoorOpened;
  public readonly entityThatOpenedTheDoor: ReturnType<Playable["toPlain"]>;

  constructor({
    entityThatOpenedTheDoor,
  }: { entityThatOpenedTheDoor: ReturnType<Playable["toPlain"]> }) {
    this.entityThatOpenedTheDoor = entityThatOpenedTheDoor;
  }
}
