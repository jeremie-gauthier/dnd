import { Trap } from "../../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../../tile/tile.entity";
import { Playable } from "../playable-entity.abstract";
import {
  MoveBehaviour,
  MoveBehaviourConstructor,
} from "./move-behaviour.interface";

export class MonsterMoveBehaviour implements MoveBehaviour {
  constructor(private readonly self: Playable) {}

  public getMovePath({ path }: { path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: Trap | undefined;
  } {
    const validatedPath: Tile[] = [];

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
            (tileEntity) =>
              !(tileEntity.isPlayable() && tileEntity.isMonster()),
          )
          .some((tileEntity) => tileEntity.isBlocking)
      ) {
        break;
      }

      previousCoord = tile.coord;
      movementPointsUsed += 1;
      validatedPath.push(tile);
    }

    return { validatedPath, movementPointsUsed, trapTriggered: undefined };
  }
}
