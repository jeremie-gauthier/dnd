import { Tile } from "../../../tile/tile.entity";
import { Hero } from "./hero.abstract";

export class Lidda extends Hero {
  public override getMovePath({ path }: { path: Array<Tile> }) {
    const validatedPath: Tile[] = [];
    let trapTriggered = undefined;

    let previousCoord = this.coord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= this._data.characteristic.movementPoints) {
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
