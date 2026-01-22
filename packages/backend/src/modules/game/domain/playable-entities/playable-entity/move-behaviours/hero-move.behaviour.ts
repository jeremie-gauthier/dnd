import { Trap } from "../../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../../tile/tile.entity";
import { MoveBehaviour } from "./move-behaviour.interface";

export class HeroMoveBehaviour extends MoveBehaviour {
  public getMovePath({ path }: { path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: Trap | undefined;
  } {
    const validatedPath: Tile[] = [];
    let trapTriggered: Trap | undefined = undefined;

    let previousCoord = this.self.coord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= this.self.characteristic.movementPoints) {
        break;
      }
      if (!previousCoord.isAdjacentTo(tile.coord)) {
        break;
      }
      if (
        tile.entities
          .filter(
            (tileEntity) => !(tileEntity.isPlayable() && tileEntity.isHero()),
          )
          .some((tileEntity) => tileEntity.isBlocking)
      ) {
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
