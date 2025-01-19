import { Game } from "../../game/game.aggregate";
import { DoubleWeaponDamage } from "../../playable-entities/playable-entity/conditions/double-weapon-damage.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class KordsBlessingPotion extends Potion {
  constructor() {
    super({ level: 1, name: "kords_blessing_potion_1" });
  }

  public override use({
    playableEntity,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    playableEntity.addCondition(
      new DoubleWeaponDamage({
        remainingTurns: 1,
        playableEntityAffected: playableEntity,
      }),
    );
  }
}
