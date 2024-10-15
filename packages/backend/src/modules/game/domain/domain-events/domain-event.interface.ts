import { EntityDiedDomainEvent } from "./dtos/entity-died.dto";
import { PlayableEntityMovedDomainEvent } from "./dtos/playable-entity-moved.dto";
import { PlayableEntityTurnEndedDomainEvent } from "./dtos/playable-entity-turn-ended.dto";
import { PlayableEntityTurnStartedDomainEvent } from "./dtos/playable-entity-turn-started.dto";
import { TrapTriggeredDomainEvent } from "./dtos/trap-triggered.dto";

export type DomainEvent =
  | PlayableEntityTurnEndedDomainEvent
  | PlayableEntityTurnStartedDomainEvent
  | PlayableEntityMovedDomainEvent
  | TrapTriggeredDomainEvent
  | EntityDiedDomainEvent;
