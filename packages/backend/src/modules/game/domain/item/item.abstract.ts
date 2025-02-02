import { ItemType, ItemTypeType } from "src/database/enums/item-type.enum";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Artifact } from "./artifact/artifact.abstract";
import { ChestTrap } from "./chest-trap/chest-trap.abstract";
import { ItemError } from "./item.error";
import { Potion } from "./potion/potion.abstract";
import { Spell } from "./spell/spell.entity";
import { Weapon } from "./weapon/weapon.entity";

type Data = {
  readonly type: ItemTypeType;
  readonly name: string;
  readonly level: number;
  [x: string]: unknown;
};

export abstract class Item<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  protected static readonly baseSchema = z.object({
    type: z.enum(["Weapon", "Spell", "ChestTrap", "Potion", "Artifact"]),
    name: z.string(),
    level: z.number().min(0).max(3),
  });

  public abstract use(_: unknown): void;

  constructor(rawData: ChildData) {
    super(rawData, rawData.name);
  }

  get type() {
    return this._data.type;
  }

  public isSpell(): this is Spell {
    return this._data.type === ItemType.SPELL;
  }

  public isWeapon(): this is Weapon {
    return this._data.type === ItemType.WEAPON;
  }

  public isChestTrap(): this is ChestTrap {
    return this._data.type === ItemType.CHESTTRAP;
  }

  public isPotion(): this is Potion {
    return this._data.type === ItemType.POTION;
  }

  public isArtifact(): this is Artifact {
    return this._data.type === ItemType.ARTIFACT;
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
