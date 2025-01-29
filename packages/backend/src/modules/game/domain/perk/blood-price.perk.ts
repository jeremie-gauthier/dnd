import { PerkName } from "src/database/enums/perk-name.enum";
import { PerkTrigger } from "src/database/enums/perk-trigger.enum";
import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class BloodPrice extends Perk {
  constructor() {
    super({ name: PerkName.BLOOD_PRICE, trigger: PerkTrigger.SPECIAL_DICE });
  }

  public override apply({
    attacker,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    attacker.takeDirectDamage({ amount: 1 });
  }
}
