import { Coord } from "../../../coord/coord.vo";
import { Tile } from "../../../tile/tile.entity";
import { BehaviourMove } from "./behaviour-move.interface";

export class BehaviourMoveMonster implements BehaviourMove {
  public getMovePath({
    availableMovementPoints,
    path,
    startingCoord,
  }: {
    availableMovementPoints: number;
    path: Array<Tile>;
    startingCoord: Coord;
  }) {
    const validatedPath: Tile[] = [];

    let previousCoord = startingCoord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= availableMovementPoints) {
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

    return { validatedPath, movementPointsUsed, hasWalkedOnATrap: false };
  }
}
