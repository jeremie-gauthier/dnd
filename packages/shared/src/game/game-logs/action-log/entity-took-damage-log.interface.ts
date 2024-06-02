import { PlayableEntity } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface EntityTookDamageActionLog extends ActionLog {
  type: "game.update.playable_entity_took_damage";
  data: {
    entityName: PlayableEntity["name"];
    damageDone: number;
    entityHpLeft: number;
  };
}
