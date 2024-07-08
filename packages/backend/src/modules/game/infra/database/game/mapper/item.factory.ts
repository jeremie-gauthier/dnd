import { Attack } from "src/modules/game/domain/attack/attack.entity";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Item } from "src/modules/game/domain/item/item.abstract";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { Item as ItemPersistence } from "../model/item.type";

export class ItemFactory {
  private constructor() {}

  public static create(data: ItemPersistence): Item {
    switch (data.type) {
      case "Weapon":
        return new Weapon({
          ...data,
          attacks: data.attacks.map(
            (attack) =>
              new Attack({
                ...attack,
                dices: attack.dices.map((dice) => new Dice(dice)),
              }),
          ),
        });
      case "Spell":
        return new Spell({
          ...data,
          attacks: data.attacks.map(
            (attack) =>
              new Attack({
                ...attack,
                dices: attack.dices.map((dice) => new Dice(dice)),
              }),
          ),
        });
    }
  }
}
