import { DoorOpenedPayload } from "src/modules/game/events/door-opened.payload";
import { EnemiesSpawnedPayload } from "src/modules/game/events/enemies-spawned.payload";
import { EntityAttackedPayload } from "src/modules/game/events/entity-attacked.payload";
import { EntityDiedPayload } from "src/modules/game/events/entity-died.payload";
import { EntityTookDamagePayload } from "src/modules/game/events/entity-took-damage.payload";
import { InitiativesRerolledPayload } from "src/modules/game/events/initiatives-rerolled.payload";
import { PlayableEntityMovedPayload } from "src/modules/game/events/playable-entity-moved.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/game/events/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/game/events/playable-entity-turn-started.payload";

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
