import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class BlanketOfFlames extends ChestTrap {
  constructor() {
    super({ level: 3, name: "blanket_of_flames_1" });
  }

  public override use(_: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
