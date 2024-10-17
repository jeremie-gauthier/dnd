import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface EntityOpenedChestActionLog extends ActionLog {
  type: "game.update.playable_entity_opened_chest";
  data: {
    entityName: PlayableEntity["name"];
  };
}
