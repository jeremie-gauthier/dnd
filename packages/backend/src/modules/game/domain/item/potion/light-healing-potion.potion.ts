import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class LightHealingPotion extends Potion {
  constructor() {
    super({ level: 1, name: "light_healing_potion_1" });
  }

  public use({
    playableEntity,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    playableEntity.regenHealthPoints({ amount: 3 });
  }
}
