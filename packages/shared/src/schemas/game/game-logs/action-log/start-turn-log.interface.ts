import { PlayableHeroEntity } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface StartTurnActionLog extends ActionLog {
  type: "start_turn_log";
  data: {
    heroId: PlayableHeroEntity["id"];
  };
}
