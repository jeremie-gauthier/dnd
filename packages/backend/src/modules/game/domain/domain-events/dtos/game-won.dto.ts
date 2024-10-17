import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "../game-event.enum";

export class GameWonDomainEvent implements IDomainEvent<GameEvent.GameWon> {
  public readonly name = GameEvent.GameWon;
}
