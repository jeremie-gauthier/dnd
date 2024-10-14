import { PlayableEntityTurnEndedDomainEvent } from "./dtos/playable-entity-turn-ended.dto";
import { PlayableEntityTurnStartedDomainEvent } from "./dtos/playable-entity-turn-started.dto";

export type DomainEvent =
  | PlayableEntityTurnEndedDomainEvent
  | PlayableEntityTurnStartedDomainEvent;
