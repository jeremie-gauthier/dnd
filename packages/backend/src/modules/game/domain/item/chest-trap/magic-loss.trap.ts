import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class MagicLoss extends ChestTrap {
  constructor() {
    super({ level: 3, name: "magic_loss_1" });
  }

  public use(_: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
