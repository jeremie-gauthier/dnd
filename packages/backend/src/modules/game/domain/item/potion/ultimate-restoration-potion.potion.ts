import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Potion } from "./potion.abstract";

export class UltimateRestorationPotion extends Potion {
  constructor() {
    super({ level: 1, name: "ultimate_restoration_potion_1" });
  }

  public use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
