import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class OlidammaraWisdomPotion extends Potion {
  constructor() {
    super({ level: 1, name: "olidammara_wisdom_potion_1" });
  }

  public use(_: {
    playableEntity: Hero;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
