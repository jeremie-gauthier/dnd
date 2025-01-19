import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";
import { PotionError } from "./potion.error";

export class InitiativePotion extends Potion {
  constructor() {
    super({ level: 1, name: "initiative_potion_1" });
  }

  public override use({
    playableEntity,
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const monsters = game.playableEntities.getMonsters();
    if (monsters.length === 0) {
      throw new PotionError({
        name: "INVALID_USAGE",
        message: "No Monster alive",
      });
    }

    const nextMonsterToPlay = monsters[0]!;
    const heroInitiativeValue = playableEntity.initiative.value;
    playableEntity.setInitiative(nextMonsterToPlay.initiative.value);
    nextMonsterToPlay.setInitiative(heroInitiativeValue);
  }
}
