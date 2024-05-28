import { PlayableEntity } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface EntityDiedActionLog extends ActionLog {
  type: "game.update.playable_entity_died";
  data: {
    entityName: PlayableEntity["name"];
  };
}
