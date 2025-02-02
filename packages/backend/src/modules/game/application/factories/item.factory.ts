import { ItemType } from "src/database/enums/item-type.enum";
import { Attack } from "../../domain/attack/attack.entity";
import { Dice } from "../../domain/dice/dice.vo";
import { Item } from "../../domain/item/item.abstract";
import { Weapon } from "../../domain/item/weapon/weapon.entity";
import { ArtifactFactory } from "./artifact.factory";
import { ChestTrapFactory } from "./chest-trap.factory";
import { GameItem } from "./item.interface";
import { PerkFactory } from "./perk.factory";
import { PotionFactory } from "./potion.factory";
import { SpellFactory } from "./spell.factory";

export class ItemFactory {
  private constructor() {}

  public static create(data: GameItem): Item {
    switch (data.type) {
      case ItemType.WEAPON:
        return new Weapon({
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
      case ItemType.SPELL:
        return SpellFactory.create(data);
      case ItemType.CHESTTRAP:
        return ChestTrapFactory.create(data.name);
      case ItemType.POTION:
        return PotionFactory.create(data.name);
      case ItemType.ARTIFACT:
        return ArtifactFactory.create(data.name);
    }
  }
}
