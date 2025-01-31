import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { BrokenArmor } from "../playable-entities/playable-entity/conditions/broken-armor.condition";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class IgnoreArmorClass extends Perk {
  constructor() {
    super({ name: "ignore_armor_class", trigger: "special_dice" });
  }

  public override apply({
    defender,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    defender.addCondition(
      new BrokenArmor({ remainingTurns: 0, playableEntityAffected: defender }),
    );
  }
}
