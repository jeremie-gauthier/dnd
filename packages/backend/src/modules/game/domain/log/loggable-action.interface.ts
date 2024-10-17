import { ChestTrapTriggeredPayload } from "src/modules/shared/events/game/chest-trap-triggered.payload";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { EntityDiedPayload } from "src/modules/shared/events/game/entity-died.payload";
import { GameWonPayload } from "src/modules/shared/events/game/game-won.payload";
import { InitiativesRerolledPayload } from "src/modules/shared/events/game/initiatives-rerolled.payload";
import { MonsterSpawnedPayload } from "src/modules/shared/events/game/monster-spawned.payload";
import { PlayableEntityAttackedPayload } from "src/modules/shared/events/game/playable-entity-attacked.payload";
import { PlayableEntityDrankPotionPayload } from "src/modules/shared/events/game/playable-entity-drank-potion.payload";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { PlayableEntityOpenedChestPayload } from "src/modules/shared/events/game/playable-entity-opened-chest.payload";
import { PlayableEntityTookDamagePayload } from "src/modules/shared/events/game/playable-entity-took-damage.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/shared/events/game/trap-triggered.payload";

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
