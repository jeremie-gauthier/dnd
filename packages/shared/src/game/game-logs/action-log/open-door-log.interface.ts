import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface OpenDoorActionLog extends ActionLog {
  type: "game.update.door_opened";
  data: {
    entityName: PlayableEntity["name"];
  };
}
