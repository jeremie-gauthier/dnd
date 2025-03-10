import { TileNonPlayableEntity } from "../../tile/tile-entity/non-playable/non-playable.entity";
import { Tile } from "../../tile/tile.entity";
import { Playable } from "../playable.entity";
import { MoveBehaviour } from "./move-behaviour.interface";

export class LiddaMoveBehaviour implements MoveBehaviour {
  public getMovePath({ self, path }: { self: Playable; path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: TileNonPlayableEntity | null;
  } {
    const validatedPath: Tile[] = [];
    let trapTriggered = null;

    let previousCoord = self.coord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= self.characteristic.movementPoints) {
        break;
      }
      if (!previousCoord.isAdjacentTo(tile.coord)) {
        break;
      }

      previousCoord = tile.coord;
      movementPointsUsed += 1;
      validatedPath.push(tile);

      trapTriggered = tile.getActiveTrap();
      if (trapTriggered) {
        break;
      }
    }

    return { validatedPath, movementPointsUsed, trapTriggered };
  }
}
