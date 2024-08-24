import { ActionLog } from "./action-log.interface";

export interface GameWonActionLog extends ActionLog {
  type: "game.status.win";
}
