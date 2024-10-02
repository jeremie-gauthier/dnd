import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class KordsBlessingPotion extends Potion {
  constructor() {
    super({ level: 1, name: "kords_blessing_potion_1" });
  }

  public use(_: {
    playableEntity: Hero;
    game: Game;
  }): void {
    throw new Error("Method not implemented.");
  }
}
