import { Attack } from "src/modules/game/domain/attack/attack.entity";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { EnergyShield } from "src/modules/game/domain/item/spell/energy-shield.spell";
import { InvisibleServant } from "src/modules/game/domain/item/spell/invisible-servant.spell";
import { Spell as SpellDomain } from "src/modules/game/domain/item/spell/spell.entity";
import { UltimateRestoration } from "src/modules/game/domain/item/spell/ultimate-restoration.spell";
import { Spell as SpellPersistence } from "src/modules/game/infra/database/entities/item/attack-item/spell/spell.entity";
import { PerkFactory } from "./perk.factory";

export class SpellFactory {
  private constructor() {}

  public static create(data: SpellPersistence): SpellDomain {
    switch (data.name) {
      case "energy_shield_1":
        return new EnergyShield({ ...data, attacks: [] });
      case "ultimate_restauration_1":
        return new UltimateRestoration({ ...data, attacks: [] });
      case "invisible_servant_1":
        return new InvisibleServant({ ...data, attacks: [] });
      default:
        return new SpellDomain({
          ...data,
          attacks: data.attacks.map(
            (attack) =>
              new Attack({
                ...attack,
                dices: attack.diceThrows.map(({ dice }) => new Dice(dice)),
                perks: attack.perks.map((perk) => PerkFactory.create(perk)),
              }),
          ),
        });
    }
  }
}
