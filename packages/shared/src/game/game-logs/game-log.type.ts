import {
  EndTurnActionLog,
  EntityAttackedActionLog,
  EntityDiedActionLog,
  EntityTookDamageActionLog,
} from "./action-log";
import { EnemiesSpawnedActionLog } from "./action-log/enemies-spawned-log.interface";
import { InitiativesRerolledActionLog } from "./action-log/initiatives-rerolled-log.interface";
import { MoveActionLog } from "./action-log/move-log.interface";
import { OpenDoorActionLog } from "./action-log/open-door-log.interface";
import { StartTurnActionLog } from "./action-log/start-turn-log.interface";

export type GameLog =
  | MoveActionLog
  | EndTurnActionLog
  | StartTurnActionLog
  | OpenDoorActionLog
  | InitiativesRerolledActionLog
  | EnemiesSpawnedActionLog
  | EntityAttackedActionLog
  | EntityDiedActionLog
  | EntityTookDamageActionLog;
