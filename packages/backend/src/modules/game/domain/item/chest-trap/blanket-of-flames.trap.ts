import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap, ChestTrapData } from "./chest-trap.abstract";

export class BlanketOfFlames extends ChestTrap {
  constructor(rawData: Omit<ChestTrapData, "name" | "type">) {
    super({ ...rawData, name: "blanket_of_flames_1" });
  }

  public override use(_: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
