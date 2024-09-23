import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Spell } from "./spell/spell.entity";
import { Weapon } from "./weapon/weapon.entity";

type Data = {
  readonly type: "Weapon" | "Spell" | "ChestTrap";
  readonly name: string;
  readonly level: number;
  [x: string]: unknown;
};

export abstract class Item<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
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

  public toString() {
    return `${this._data.name} (${this._data.type} lv. ${this._data.level})`;
  }
}
