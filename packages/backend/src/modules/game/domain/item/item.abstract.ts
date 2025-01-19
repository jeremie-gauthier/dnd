import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { ChestTrap } from "./chest-trap/chest-trap.abstract";
import { ItemError } from "./item.error";
import { Potion } from "./potion/potion.abstract";
import { Spell } from "./spell/spell.entity";
import { Weapon } from "./weapon/weapon.entity";

type Data = {
  readonly type: "Weapon" | "Spell" | "ChestTrap" | "Potion" | "Artifact";
  readonly name: string;
  readonly level: number;
  [x: string]: unknown;
};

export abstract class Item<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  protected static baseSchema = z.object({
    type: z.enum(["Weapon", "Spell", "ChestTrap", "Potion", "Artifact"]),
    name: z.string(),
    level: z.number().min(0).max(3),
  });

  public abstract use(_: unknown): void;
  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.name);
  }

  get type() {
    return this._data.type;
  }

  public isSpell(): this is Spell {
    return this._data.type === "Spell";
  }

  public isWeapon(): this is Weapon {
    return this._data.type === "Weapon";
  }

  public isChestTrap(): this is ChestTrap {
    return this._data.type === "ChestTrap";
  }

  public isPotion(): this is Potion {
    return this._data.type === "Potion";
  }

  public toString() {
    return `${this._data.name} (${this._data.type} lv. ${this._data.level})`;
  }

  public mustBePotion() {
    if (!this.isPotion()) {
      throw new ItemError({
        name: "BAD_ITEM_TYPE",
        message: `Bad item type: "${this.id}" is not a Potion`,
      });
    }
  }
}
