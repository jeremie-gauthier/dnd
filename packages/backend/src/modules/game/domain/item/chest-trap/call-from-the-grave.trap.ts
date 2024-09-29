import { Game } from "../../game/game.aggregate";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class CallFromTheGrave extends ChestTrap {
  constructor() {
    super({ level: 1, name: "call_from_the_grave_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Playable;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
