import { Game } from "../../game/game.aggregate";
import { Weakness } from "../../playable-entities/playable-entity/conditions/condition/weakness.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

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
    const randomMonster = game.playableEntities.getRandomMonsterOrThrow();
    const weaknessCondition = new Weakness({ remainingTurns: 2 });
    weaknessCondition.apply({ playableEntityAffected: randomMonster });
    randomMonster.conditions.add({
      condition: weaknessCondition,
    });
  }
}
