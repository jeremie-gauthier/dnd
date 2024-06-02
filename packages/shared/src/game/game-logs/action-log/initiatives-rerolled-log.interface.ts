import { ActionLog } from "./action-log.interface";

export interface InitiativesRerolledActionLog extends ActionLog {
  type: "game.update.initiatives_rerolled";
}
