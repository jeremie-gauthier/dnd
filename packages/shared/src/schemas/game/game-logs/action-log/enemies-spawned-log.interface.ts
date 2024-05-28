import { ActionLog } from "./action-log.interface";

export interface EnemiesSpawnedActionLog extends ActionLog {
  type: "game.update.enemies_spawned";
}
