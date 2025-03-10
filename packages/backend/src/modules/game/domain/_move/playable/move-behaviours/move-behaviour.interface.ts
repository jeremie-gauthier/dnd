import { TileNonPlayableEntity } from "../../tile/tile-entity/non-playable/non-playable.entity";
import { Tile } from "../../tile/tile.entity";
import { Playable } from "../playable.entity";

export interface MoveBehaviour {
  getMovePath(_: { self: Playable; path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: TileNonPlayableEntity | null;
  };
}
