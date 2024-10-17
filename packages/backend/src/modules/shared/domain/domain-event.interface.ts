import { GameEvent } from "src/modules/game/domain/domain-events/game-event.enum";
import { LobbyEvent } from "../events/lobby/lobby-event.enum";

export interface IDomainEvent<TEventName extends GameEvent | LobbyEvent> {
  readonly name: TEventName;
}
