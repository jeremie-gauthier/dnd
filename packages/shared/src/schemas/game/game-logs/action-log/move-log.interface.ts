import { PlayableHeroEntity, Tile } from "../../../../database";
import { ActionLog } from "./action-log.interface";

export interface MoveActionLog extends ActionLog {
  type: "move_action_log";
  data: {
    heroId: PlayableHeroEntity["id"];
    movementPointsUsed: PlayableHeroEntity["characteristic"]["movementPoints"];
    originTile: Tile;
    destinationTile: Tile;
  };
}
