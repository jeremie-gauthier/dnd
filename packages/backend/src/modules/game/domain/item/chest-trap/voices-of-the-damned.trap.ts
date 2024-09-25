import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class VoicesOfTheDamned extends ChestTrap {
  constructor() {
    super({ level: 1, name: "voices_of_the_damned_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
