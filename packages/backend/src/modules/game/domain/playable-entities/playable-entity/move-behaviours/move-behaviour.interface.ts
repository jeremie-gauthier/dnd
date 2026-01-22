import { Trap } from "../../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../../tile/tile.entity";
import { Playable } from "../playable-entity.abstract";

export interface MoveBehaviour {
  getMovePath(_: { path: Array<Tile> }): {
    validatedPath: Array<Tile>;
    movementPointsUsed: number;
    trapTriggered: Trap | undefined;
  };
}

export interface MoveBehaviourConstructor {
  new (self: Playable): MoveBehaviour;
}
