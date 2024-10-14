import { GameEvent } from "../events/game/game-event.enum";

export interface IDomainEvent<TEventName extends GameEvent> {
  readonly name: TEventName;
}
