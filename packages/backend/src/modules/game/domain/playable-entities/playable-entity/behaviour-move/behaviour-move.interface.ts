import { Coord } from "../../../coord/coord.vo";
import { Tile } from "../../../tile/tile.entity";

export interface BehaviourMove {
  getMovePath(_: {
    availableMovementPoints: number;
    path: Array<Tile>;
    startingCoord: Coord;
  }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    hasWalkedOnATrap: boolean;
  };
}
