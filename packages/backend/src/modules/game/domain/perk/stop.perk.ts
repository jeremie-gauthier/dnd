import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Stopped } from "../playable-entities/playable-entity/conditions/stopped.condition";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class Stop extends Perk {
  constructor() {
    super({ name: "stop", trigger: "special_dice" });
  }

  public apply({
    defender,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    defender.addCondition(
      new Stopped({ remainingTurns: 1, playableEntityAffected: defender }),
    );
  }
}
