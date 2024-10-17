import { PlayableEntity } from "../../../database";
import { PotionItem } from "../../../database/game/game-item/potion.interface";
import { ActionLog } from "./action-log.interface";

export interface EntityDrankPotionActionLog extends ActionLog {
  type: "game.update.playable_entity_drank_potion";
  data: {
    entityName: PlayableEntity["name"];
    potionName: PotionItem["name"];
  };
}
