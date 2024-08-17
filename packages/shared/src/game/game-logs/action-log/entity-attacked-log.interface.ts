import { GameItem, PlayableEntity } from "../../../database";
import { ActionLog } from "./action-log.interface";

export interface EntityAttackedActionLog extends ActionLog {
  type: "game.update.playable_entity_attacked";
  data: {
    attackerEntityName: PlayableEntity["name"];
    attackItemUsedName: GameItem["name"];
    bonusScore: number;
    diceScore: number;
    diceRollResults: { name: string; color: `#${string}`; result: number }[];
    attackPower: number;
    targetEntityName: PlayableEntity["name"];
  };
}
