import { sum } from "@dnd/shared";
import { PerkName } from "src/database/enums/perk-name.enum";
import { PerkTrigger } from "src/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class DoubleDamage extends Perk {
  constructor() {
    super({ name: PerkName.DOUBLE_DAMAGE, trigger: PerkTrigger.SPECIAL_DICE });
  }

  public override apply({
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
