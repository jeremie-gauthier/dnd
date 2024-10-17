import { ChestTrapTriggeredPayload } from "src/modules/game/application/events/chest-trap-triggered.payload";
import { DoorOpenedPayload } from "src/modules/game/application/events/door-opened.payload";
import { EntityDiedPayload } from "src/modules/game/application/events/entity-died.payload";
import { GameWonPayload } from "src/modules/game/application/events/game-won.payload";
import { InitiativesRerolledPayload } from "src/modules/game/application/events/initiatives-rerolled.payload";
import { MonsterSpawnedPayload } from "src/modules/game/application/events/monster-spawned.payload";
import { PlayableEntityAttackedPayload } from "src/modules/game/application/events/playable-entity-attacked.payload";
import { PlayableEntityDrankPotionPayload } from "src/modules/game/application/events/playable-entity-drank-potion.payload";
import { PlayableEntityMovedPayload } from "src/modules/game/application/events/playable-entity-moved.payload";
import { PlayableEntityOpenedChestPayload } from "src/modules/game/application/events/playable-entity-opened-chest.payload";
import { PlayableEntityTookDamagePayload } from "src/modules/game/application/events/playable-entity-took-damage.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/game/application/events/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/game/application/events/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/game/application/events/trap-triggered.payload";

export type LoggableAction =
  | PlayableEntityMovedPayload
  | PlayableEntityTurnEndedPayload
  | DoorOpenedPayload
  | PlayableEntityTurnStartedPayload
  | InitiativesRerolledPayload
  | MonsterSpawnedPayload
  | PlayableEntityAttackedPayload
  | EntityDiedPayload
  | PlayableEntityTookDamagePayload
  | GameWonPayload
  | TrapTriggeredPayload
  | ChestTrapTriggeredPayload
  | PlayableEntityOpenedChestPayload
  | PlayableEntityDrankPotionPayload;
