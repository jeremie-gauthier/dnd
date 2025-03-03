import { Game } from "../../game/game.aggregate";
import { Stopped } from "../../playable-entities/playable-entity/conditions/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion, PotionData } from "./potion.abstract";

export class PotionOfLaughter extends Potion {
  constructor(rawData: Omit<PotionData, "name" | "type">) {
    super({ ...rawData, name: "potion_of_laughter_1" });
  }

  public override use({
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const randomMonster = game.playableEntities.getRandomMonsterOrThrow();
    randomMonster.addCondition(
      new Stopped({ remainingTurns: 1, playableEntityAffected: randomMonster }),
    );
  }
}
