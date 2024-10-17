import { MonsterRace } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface MonsterSpawnedActionLog extends ActionLog {
  type: "game.update.monster_spawned";
  data: {
    monsterRace: MonsterRace;
  };
}
