import { ChestTrapTriggeredPayload } from "src/modules/shared/events/game/chest-trap-triggered.payload";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { MonstersSpawnedPayload } from "src/modules/shared/events/game/enemies-spawned.payload";
import { EntityAttackedPayload } from "src/modules/shared/events/game/entity-attacked.payload";
import { EntityDiedPayload } from "src/modules/shared/events/game/entity-died.payload";
import { EntityTookDamagePayload } from "src/modules/shared/events/game/entity-took-damage.payload";
import { GameWonPayload } from "src/modules/shared/events/game/game-won.payload";
import { InitiativesRerolledPayload } from "src/modules/shared/events/game/initiatives-rerolled.payload";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/shared/events/game/trap-triggered.payload";

export type LoggableAction =
  | PlayableEntityMovedPayload
  | PlayableEntityTurnEndedPayload
  | DoorOpenedPayload
  | PlayableEntityTurnStartedPayload
  | InitiativesRerolledPayload
  | MonstersSpawnedPayload
  | EntityAttackedPayload
  | EntityDiedPayload
  | EntityTookDamagePayload
  | GameWonPayload
  | TrapTriggeredPayload
  | ChestTrapTriggeredPayload;
