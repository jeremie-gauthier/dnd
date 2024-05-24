import { PlayableHeroEntity } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface EndTurnActionLog extends ActionLog {
  type: "end_turn_log";
  data: {
    heroId: PlayableHeroEntity["id"];
  };
}
