import { TileNonPlayableEntity } from "../../tile/tile-entity/non-playable/non-playable.entity";
import { Tile } from "../../tile/tile.entity";
import { Playable } from "../playable.entity";
import { MoveBehaviour } from "./move-behaviour.interface";

export class HeroMoveBehaviour implements MoveBehaviour {
  public getMovePath({ self, path }: { self: Playable; path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: TileNonPlayableEntity | null;
  } {
    const validatedPath: Tile[] = [];
    let trapTriggered: TileNonPlayableEntity | null = null;

    let previousCoord = self.coord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= self.characteristic.movementPoints) {
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
