import { DoorOpenedPayload } from "src/game/events/emitters/door-opened.payload";
import { EnemiesSpawnedPayload } from "src/game/events/emitters/enemies-spawned.payload";
import { EntityAttackedPayload } from "src/game/events/emitters/entity-attacked.payload";
import { EntityDiedPayload } from "src/game/events/emitters/entity-died.payload";
import { EntityTookDamagePayload } from "src/game/events/emitters/entity-took-damage.payload";
import { InitiativesRerolledPayload } from "src/game/events/emitters/initiatives-rerolled.payload";
import { PlayableEntityMovedPayload } from "src/game/events/emitters/playable-entity-moved.payload";
import { PlayableEntityTurnEndedPayload } from "src/game/events/emitters/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/game/events/emitters/playable-entity-turn-started.payload";

export type LoggableAction =
  | PlayableEntityMovedPayload
  | PlayableEntityTurnEndedPayload
  | DoorOpenedPayload
  | PlayableEntityTurnStartedPayload
  | InitiativesRerolledPayload
  | EnemiesSpawnedPayload
  | EntityAttackedPayload
  | EntityDiedPayload
  | EntityTookDamagePayload;
