import { Stopped } from "../../playable-entities/playable-entity/conditions/condition/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class DazzlingLight extends ChestTrap {
  constructor() {
    super({ level: 1, name: "dazzling_light_1" });
  }

  public use({
    entityThatOpenedTheChest,
  }: {
    entityThatOpenedTheChest: Hero;
  }): void {
    const condition = new Stopped({ remainingTurns: 1 });
    entityThatOpenedTheChest.conditions.add({ condition });
  }
}
