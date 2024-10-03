import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class PartialRestorationPotion extends Potion {
  constructor() {
    super({ level: 1, name: "partial_restoration_potion_1" });
  }

  public use({
    playableEntity,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    playableEntity.regenMana({ amount: 3 });
  }
}
