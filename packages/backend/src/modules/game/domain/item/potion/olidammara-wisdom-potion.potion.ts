import { Game } from "../../game/game.aggregate";
import { TrapProtection } from "../../playable-entities/playable-entity/conditions/trap-protection.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class OlidammaraWisdomPotion extends Potion {
  constructor() {
    super({ level: 1, name: "olidammara_wisdom_potion_1" });
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
