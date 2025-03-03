import { Game } from "../../game/game.aggregate";
import { TrapProtection } from "../../playable-entities/playable-entity/conditions/trap-protection.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion, PotionData } from "./potion.abstract";

export class OlidammaraWisdomPotion extends Potion {
  constructor(rawData: Omit<PotionData, "name" | "type">) {
    super({ ...rawData, name: "olidammara_wisdom_potion_1" });
  }

  public override use({
    playableEntity,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    playableEntity.addCondition(
      new TrapProtection({
        remainingTurns: 1,
        playableEntityAffected: playableEntity,
      }),
    );
  }
}
