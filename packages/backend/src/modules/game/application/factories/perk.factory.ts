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
    perkName: GameItem["attacks"][number]["perks"][number]["name"],
  ): Perk {
    switch (perkName) {
      case "mana_leech":
        return new ManaLeech();
      case "breakable":
        return new Breakable();
      case "critical_failure":
        return new CriticalFailure();
      case "greater_healing":
        return new GreaterHealing();
      case "blood_price":
        return new BloodPrice();
      case "double_damage":
        return new DoubleDamage();
      case "frozen":
        return new Frozen();
      case "ignore_armor_class":
        return new IgnoreArmorClass();
      case "reroll_all_dices":
        return new RerollAllDices();
      case "reroll_one_dice":
        return new RerollOneDice();
      case "stop":
        return new Stop();
      case "turn_undead":
        return new TurnUndead();
      default:
        throw new Error(`No "${perkName}" perk found`);
    }
  }
}
