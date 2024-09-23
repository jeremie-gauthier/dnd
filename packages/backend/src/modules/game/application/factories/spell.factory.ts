import { Attack } from "../../domain/attack/attack.entity";
import { Dice } from "../../domain/dice/dice.vo";
import { EnergyShield } from "../../domain/item/spell/energy-shield.spell";
import { InvisibleServant } from "../../domain/item/spell/invisible-servant.spell";
import { Spell } from "../../domain/item/spell/spell.entity";
import { UltimateRestoration } from "../../domain/item/spell/ultimate-restoration.spell";
import { SpellItem } from "./item.interface";
import { PerkFactory } from "./perk.factory";

export class SpellFactory {
  private constructor() {}

  public static create(data: Omit<SpellItem, "type">): Spell {
    switch (data.name) {
      case "energy_shield_1":
        return new EnergyShield({ ...data, attacks: [] });
      case "ultimate_restauration_1":
        return new UltimateRestoration({ ...data, attacks: [] });
      case "invisible_servant_1":
        return new InvisibleServant({ ...data, attacks: [] });
      default:
        return new Spell({
          ...data,
          attacks: data.attacks.map(
            (attack) =>
              new Attack({
                ...attack,
                dices: attack.dices.map((dice) => new Dice(dice)),
                perks: attack.perks.map((perk) =>
                  PerkFactory.create(perk.name),
                ),
              }),
          ),
        });
    }
  }
}
