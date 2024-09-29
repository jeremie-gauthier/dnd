import { Game } from "../../game/game.aggregate";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class BlanketOfFlames extends ChestTrap {
  constructor() {
    super({ level: 3, name: "blanket_of_flames_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Playable;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
