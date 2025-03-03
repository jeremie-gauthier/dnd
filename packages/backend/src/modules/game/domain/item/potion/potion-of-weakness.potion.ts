import { Game } from "../../game/game.aggregate";
import { Weakness } from "../../playable-entities/playable-entity/conditions/weakness.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion, PotionData } from "./potion.abstract";

export class PotionOfWeakness extends Potion {
  constructor(rawData: Omit<PotionData, "name" | "type">) {
    super({ ...rawData, name: "potion_of_weakness_1" });
  }

  public override use({
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const randomMonster = game.playableEntities.getRandomMonsterOrThrow();
    randomMonster.addCondition(
      new Weakness({
        remainingTurns: 2,
        playableEntityAffected: randomMonster,
      }),
    );
  }
}
