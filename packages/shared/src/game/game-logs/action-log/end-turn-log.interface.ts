import { PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface EndTurnActionLog extends ActionLog {
  type: "game.update.playable_entity_turn_ended";
  data: {
    entityName: PlayableEntity["name"];
  };
}
