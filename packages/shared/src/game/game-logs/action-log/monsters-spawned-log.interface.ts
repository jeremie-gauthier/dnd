import { ActionLog } from "./action-log.interface";

export interface MonstersSpawnedActionLog extends ActionLog {
  type: "game.update.monsters_spawned";
}
