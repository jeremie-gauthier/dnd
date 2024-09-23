import { Attack } from "../../domain/attack/attack.entity";
import { Dice } from "../../domain/dice/dice.vo";
import { Item } from "../../domain/item/item.abstract";
import { Spell } from "../../domain/item/spell/spell.entity";
import { Weapon } from "../../domain/item/weapon/weapon.entity";
import { ArtifactFactory } from "./artifact.factory";
import { ChestTrapFactory } from "./chest-trap.factory";
import { GameItem } from "./item.interface";
import { PerkFactory } from "./perk.factory";
import { PotionFactory } from "./potion.factory";

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
                perks: attack.perks.map((perk) =>
                  PerkFactory.create(perk.name),
                ),
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
                perks: attack.perks.map((perk) =>
                  PerkFactory.create(perk.name),
                ),
              }),
          ),
        });
      case "ChestTrap":
        return ChestTrapFactory.create(data.name);
      case "Potion":
        return PotionFactory.create(data.name);
      case "Artifact":
        return ArtifactFactory.create(data.name);
    }
  }
}
