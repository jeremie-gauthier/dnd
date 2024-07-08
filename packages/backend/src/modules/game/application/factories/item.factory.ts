import { Attack } from "../../domain/attack/attack.entity";
import { Dice } from "../../domain/dice/dice.vo";
import { Item } from "../../domain/item/item.abstract";
import { Spell } from "../../domain/item/spell/spell.entity";
import { Weapon } from "../../domain/item/weapon/weapon.entity";
import { GameItem } from "./item.interface";

export class ItemFactory {
  private constructor() {}

  public static create(data: GameItem): Item {
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

// type BaseItemRaw = {
//   readonly id: string;
//   readonly name: string;
//   readonly level: number;
// };

// interface PerkRaw {
//   readonly name: string;
// }

// type ItemRaw =
//   | (BaseItemRaw & {
//       readonly type: "Spell";
//       readonly manaCost: ItemManaCostJson;
//       readonly attacks: Array<AttackRaw>;
//       readonly perks: Array<PerkRaw>;
//     })
//   | (BaseItemRaw & {
//       readonly type: "Weapon";
//       readonly attacks: Array<AttackRaw>;
//       readonly perks: Array<PerkRaw>;
//     });

// interface AttackRaw {
//   readonly id: string;
//   readonly range: AttackRangeType;
//   readonly type: AttackTypeType;
//   readonly attackDices: Array<AttackDiceRaw>;
// }

// interface AttackDiceRaw {
//   readonly dice: DiceRaw;
// }

// interface DiceRaw {
//   readonly name: string;
//   readonly values: [number, number, number, number, number, number];
// }
