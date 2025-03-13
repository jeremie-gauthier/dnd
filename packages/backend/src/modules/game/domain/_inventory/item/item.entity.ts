import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import {
  ItemType,
  ItemTypeType,
} from "../../../infra/database/enums/item-type.enum";
import { ItemError } from "./item.error";

type Data = {
  readonly type: ItemTypeType;
  readonly name: string;
};

export class Item extends Entity<Data> {
  protected static readonly schema = z.object({
    type: z.enum([
      ItemType.WEAPON,
      ItemType.SPELL,
      ItemType.CHESTTRAP,
      ItemType.POTION,
      ItemType.ARTIFACT,
    ]),
    name: z.string(),
  });

  constructor(rawData: Data) {
    super(rawData, rawData.name);
  }

  // #region Getters

  public get type() {
    return this._data.type;
  }

  public get name() {
    return this._data.name;
  }

  // #region Methods

  public isSpell(): boolean {
    return this.isOfType(ItemType.SPELL);
  }

  public isWeapon(): boolean {
    return this.isOfType(ItemType.WEAPON);
  }

  public isChestTrap(): boolean {
    return this.isOfType(ItemType.CHESTTRAP);
  }

  public isPotion(): boolean {
    return this.isOfType(ItemType.POTION);
  }

  public isArtifact(): boolean {
    return this.isOfType(ItemType.ARTIFACT);
  }

  private isOfType(type: ItemTypeType) {
    return this._data.type === type;
  }

  public mustBePotion() {
    if (!this.isPotion()) {
      throw new ItemError({
        name: "BAD_ITEM_TYPE",
        message: `Bad item type: "${this.id}" is not a ${ItemType.POTION}`,
      });
    }
  }

  public override toPlain(): PlainData<Data> {
    throw new Error("Method not implemented.");
  }
}
