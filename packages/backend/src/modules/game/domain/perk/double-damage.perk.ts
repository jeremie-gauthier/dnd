import { sum } from "@dnd/shared";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class DoubleDamage extends Perk {
  constructor() {
    super({ name: "double_damage", trigger: "special_dice" });
  }

  public apply({
    dicesResults,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    dicesResults.sumResult += sum(
      ...dicesResults.dicesResults
        .filter(({ dice }) => dice.name !== "special")
        .map(({ result }) => result),
    );
  }
}
