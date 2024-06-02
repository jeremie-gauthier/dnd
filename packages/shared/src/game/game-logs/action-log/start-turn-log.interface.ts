import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface StartTurnActionLog extends ActionLog {
  type: "game.update.playable_entity_turn_started";
  data: {
    entityName: PlayableEntity["name"];
  };
}
