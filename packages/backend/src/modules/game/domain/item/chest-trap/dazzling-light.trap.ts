import { Stopped } from "../../playable-entities/playable-entity/conditions/stopped.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap, ChestTrapData } from "./chest-trap.abstract";

export class DazzlingLight extends ChestTrap {
  constructor(rawData: Omit<ChestTrapData, "name" | "type">) {
    super({ ...rawData, name: "dazzling_light_1" });
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
