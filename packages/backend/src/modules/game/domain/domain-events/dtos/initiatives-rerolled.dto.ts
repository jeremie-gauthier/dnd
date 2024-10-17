import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";

export class InitiativesRerolledDomainEvent
  implements IDomainEvent<GameEvent.InitiativesRerolled>
{
  public readonly name = GameEvent.InitiativesRerolled;
}
