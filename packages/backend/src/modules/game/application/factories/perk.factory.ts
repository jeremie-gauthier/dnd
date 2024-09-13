import { Breakable } from "../../domain/perk/breakable.perk";
import { CriticalFailure } from "../../domain/perk/critical-failure.perk";
import { GreaterHealing } from "../../domain/perk/greater-healing.perk";
import { ManaLeech } from "../../domain/perk/mana-leech.perk";
import { Perk } from "../../domain/perk/perk.abstract";
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
      default:
        throw new Error(`No "${data.name}" perk found`);
    }
  }
}
