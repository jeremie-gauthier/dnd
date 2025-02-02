import { ItemTypeType } from "src/database/enums/item-type.enum";

export abstract class Item {
  abstract readonly type: ItemTypeType;
  readonly name: string;
  readonly level: number;
}
