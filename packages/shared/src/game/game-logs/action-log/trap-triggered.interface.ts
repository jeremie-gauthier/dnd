import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface TrapTriggeredLog extends ActionLog {
  type: "game.update.trap_triggered";
  data: {
    trapName: "pit";
    subjectEntityName: PlayableEntity["name"];
  };
}
