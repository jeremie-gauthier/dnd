import { Attack } from "../attack/attack.entity";
import { Item } from "../item/item.abstract";
import { Stopped } from "../playable-entities/playable-entity/conditions/stopped.condition";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Perk } from "./perk.abstract";

export class TurnUndead extends Perk {
  constructor() {
    super({ name: "turn_undead", trigger: "special_dice" });
  }

  public override apply({
    defender,
  }: {
    dicesResults: ReturnType<Attack["roll"]>;
    itemUsed: Item;
    attacker: Playable;
    defender: Playable;
  }): void {
    if (defender.isUndead()) {
      defender.addCondition(
        new Stopped({ remainingTurns: 1, playableEntityAffected: defender }),
      );
    }
  }
}
