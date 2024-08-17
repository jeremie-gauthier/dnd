import { Tile } from "../../../tile/tile.entity";
import { Hero } from "./hero.abstract";

export class Lidda extends Hero {
  public getMovePath({ path }: { path: Array<Tile> }) {
    const validatedPath: Tile[] = [];
    let hasWalkedOnATrap = false;

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

      const trap = tile.entities.find(
        (tileEntity) => tileEntity.isInteractive() && tileEntity.isTrap(),
      );
      if (trap) {
        hasWalkedOnATrap = true;
        break;
      }
    }

    return { validatedPath, movementPointsUsed, hasWalkedOnATrap };
  }
}
