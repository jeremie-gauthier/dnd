import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class BrutalBetrayal extends ChestTrap {
  constructor() {
    super({ level: 2, name: "brutal_betrayal_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
