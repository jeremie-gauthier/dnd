import {
  EndTurnActionLog,
  EntityAttackedActionLog,
  EntityDiedActionLog,
  EntityTookDamageActionLog,
  GameWonActionLog,
  TrapTriggeredLog,
} from "./action-log";
import { ChestTrapTriggeredLog } from "./action-log/chest-trap-triggered.interface";
import { InitiativesRerolledActionLog } from "./action-log/initiatives-rerolled-log.interface";
import { MonsterSpawnedActionLog } from "./action-log/monster-spawned-log.interface";
import { MoveActionLog } from "./action-log/move-log.interface";
import { OpenDoorActionLog } from "./action-log/open-door-log.interface";
import { StartTurnActionLog } from "./action-log/start-turn-log.interface";

export type GameLog =
  | MoveActionLog
  | EndTurnActionLog
  | StartTurnActionLog
  | OpenDoorActionLog
  | InitiativesRerolledActionLog
  | MonsterSpawnedActionLog
  | EntityAttackedActionLog
  | EntityDiedActionLog
  | EntityTookDamageActionLog
  | GameWonActionLog
  | TrapTriggeredLog
  | ChestTrapTriggeredLog;
