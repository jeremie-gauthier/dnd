import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class GreaterHealing extends Perk {
  constructor() {
    super({ name: "greater_healing", trigger: "special_dice" });
  }

  public override apply({
    dicesResults,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    dicesResults.sumResult += 1;
  }
}
