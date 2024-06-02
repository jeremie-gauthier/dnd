import { PlayableEntity } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface MoveActionLog extends ActionLog {
  type: "game.update.playable_entity_moved";
  data: {
    entityName: PlayableEntity["name"];
  };
}
