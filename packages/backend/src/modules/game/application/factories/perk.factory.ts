import { BloodPrice } from "../../domain/perk/blood-price.perk";
import { Breakable } from "../../domain/perk/breakable.perk";
import { CriticalFailure } from "../../domain/perk/critical-failure.perk";
import { DoubleDamage } from "../../domain/perk/double-damage.perk";
import { Frozen } from "../../domain/perk/frozen.perk";
import { GreaterHealing } from "../../domain/perk/greater-healing.perk";
import { IgnoreArmorClass } from "../../domain/perk/ignore-armor-class.perk";
import { ManaLeech } from "../../domain/perk/mana-leech.perk";
import { Perk } from "../../domain/perk/perk.abstract";
import { RerollAllDices } from "../../domain/perk/reroll-all-dices.perk";
import { RerollOneDice } from "../../domain/perk/reroll-one-dice.perk";
import { Stop } from "../../domain/perk/stop.perk";
import { TurnUndead } from "../../domain/perk/turn-undead.perk";
import { GameItem } from "./item.interface";

export class PerkFactory {
  private constructor() {}

  public static create(
    data: GameItem["attacks"][number]["perks"][number],
  ): Perk {
    switch (data.name) {
      case "mana_leech":
        return new ManaLeech(data);
      case "breakable":
        return new Breakable(data);
      case "critical_failure":
        return new CriticalFailure(data);
      case "greater_healing":
        return new GreaterHealing(data);
      case "blood_price":
        return new BloodPrice(data);
      case "double_damage":
        return new DoubleDamage(data);
      case "frozen":
        return new Frozen(data);
      case "ignore_armor_class":
        return new IgnoreArmorClass(data);
      case "reroll_all_dices":
        return new RerollAllDices(data);
      case "reroll_one_dice":
        return new RerollOneDice(data);
      case "stop":
        return new Stop(data);
      case "turn_undead":
        return new TurnUndead(data);
      default:
        throw new Error(`No "${data.name}" perk found`);
    }
  }
}
