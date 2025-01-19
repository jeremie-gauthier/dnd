import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class CriticalFailure extends Perk {
  constructor() {
    super({ name: "critical_failure", trigger: "special_dice" });
  }

  public override apply({
    dicesResults,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    dicesResults.sumResult = 0;
  }
}
