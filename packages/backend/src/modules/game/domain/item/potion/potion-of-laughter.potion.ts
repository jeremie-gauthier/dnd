import { Game } from "../../game/game.aggregate";
import { Stopped } from "../../playable-entities/playable-entity/conditions/condition/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

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
    const randomMonster = game.playableEntities.getRandomMonsterOrThrow();
    randomMonster.conditions.add({
      condition: new Stopped({ remainingTurns: 1 }),
    });
  }
}
