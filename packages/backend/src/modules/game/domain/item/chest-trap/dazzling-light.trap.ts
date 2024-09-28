import { Stopped } from "../../playable-entities/playable-entity/conditions/condition/stopped.condition";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class DazzlingLight extends ChestTrap {
  constructor() {
    super({ level: 1, name: "dazzling_light_1" });
  }

  public use({
    entityThatOpenedTheChest,
  }: {
    entityThatOpenedTheChest: Playable;
  }): void {
    const condition = new Stopped({ remainingTurns: 1 });
    entityThatOpenedTheChest.conditions.add({ condition });
  }
}
