import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class MagicLoss extends ChestTrap {
  constructor() {
    super({ level: 3, name: "magic_loss_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
