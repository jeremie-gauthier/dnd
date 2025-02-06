import { Attack } from "src/modules/game/domain/attack/attack.entity";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Weapon as WeaponDomain } from "src/modules/game/domain/item/weapon/weapon.entity";
import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { ItemPersistence } from "../../interfaces/item-persistence.interface";
import { ArtifactFactory } from "./artifact.factory";
import { ChestTrapFactory } from "./chest-trap.factory";
import { PerkFactory } from "./perk.factory";
import { PotionFactory } from "./potion.factory";
import { SpellFactory } from "./spell.factory";

export class ItemFactory {
  private constructor() {}

  public static create(data: ItemPersistence): ItemDomain {
    switch (data.type) {
      case ItemType.WEAPON:
        return new WeaponDomain({
          ...data,
          attacks: data.attacks.map(
            (attack) =>
              new Attack({
                ...attack,
                dices: attack.attackDices.map(({ dice }) => new Dice(dice)),
                perks: attack.perks.map((perk) => PerkFactory.create(perk)),
              }),
          ),
        });
      case ItemType.SPELL:
        return SpellFactory.create(data);
      case ItemType.CHESTTRAP:
        return ChestTrapFactory.create(data);
      case ItemType.POTION:
        return PotionFactory.create(data);
      case ItemType.ARTIFACT:
        return ArtifactFactory.create(data);
    }
  }
}
