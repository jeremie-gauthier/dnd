import { Game } from "../../game/game.aggregate";
import { Stopped } from "../../playable-entities/playable-entity/conditions/condition/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";
import { PotionError } from "./potion.error";

export class PotionOfLaughter extends Potion {
  constructor() {
    super({ level: 1, name: "potion_of_laughter_1" });
  }

  public use({
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const monsters = game.playableEntities.getMonsters();
    const randIndex = Math.trunc(Math.random() * monsters.length);
    const randomMonster = monsters[randIndex];

    if (!randomMonster) {
      throw new PotionError({
        name: "INVALID_USAGE",
        message: "No Monster alive",
      });
    }

    randomMonster.conditions.add({
      condition: new Stopped({ remainingTurns: 1 }),
    });
  }
}
