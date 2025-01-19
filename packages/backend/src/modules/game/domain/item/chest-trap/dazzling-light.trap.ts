import { Stopped } from "../../playable-entities/playable-entity/conditions/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class DazzlingLight extends ChestTrap {
  constructor() {
    super({ level: 1, name: "dazzling_light_1" });
  }

  public override use({
    entityThatOpenedTheChest,
  }: {
    entityThatOpenedTheChest: Hero;
  }): void {
    entityThatOpenedTheChest.addCondition(
      new Stopped({
        remainingTurns: 1,
        playableEntityAffected: entityThatOpenedTheChest,
      }),
    );
  }
}
