import { GameItem } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";

@Injectable()
export class ItemService {
  public itemEntityToGameItem(item: Item): GameItem | undefined {
    if (this.isWeapon(item)) {
      return {
        type: "Weapon",
        name: item.name,
        level: item.level,
        imgUrl: item.imgUrl,
        attacks: item.attacks.map((attack) => ({
          id: attack.id,
          range: attack.range,
          type: attack.type,
          dices: attack.attackDices.map(({ dice }) => dice),
        })),
        perks: item.perks.map((perk) => ({
          name: perk.name,
          iconUrl: perk.iconUrl,
        })),
      };
    }

    if (this.isSpell(item)) {
      return {
        type: "Spell",
        name: item.name,
        level: item.level,
        imgUrl: item.imgUrl,
        manaCost: item.manaCost,
        attacks: item.attacks.map((attack) => ({
          id: attack.id,
          range: attack.range,
          type: attack.type,
          dices: attack.attackDices.map(({ dice }) => dice),
        })),
        perks: item.perks.map((perk) => ({
          name: perk.name,
          iconUrl: perk.iconUrl,
        })),
      };
    }
  }

  public isWeapon(item: Item): item is Weapon {
    return item.type === "Weapon";
  }

  public isSpell(item: Item): item is Spell {
    return item.type === "Spell";
  }
}
