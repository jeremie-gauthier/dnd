import { Game } from "../../game/game.aggregate";
import { Weakness } from "../../playable-entities/playable-entity/conditions/condition/weakness.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";
import { PotionError } from "./potion.error";

export class PotionOfWeakness extends Potion {
  constructor() {
    super({ level: 1, name: "potion_of_weakness_1" });
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

    const weaknessCondition = new Weakness({ remainingTurns: 2 });
    weaknessCondition.apply({ playableEntityAffected: randomMonster });
    randomMonster.conditions.add({
      condition: weaknessCondition,
    });
  }
}
