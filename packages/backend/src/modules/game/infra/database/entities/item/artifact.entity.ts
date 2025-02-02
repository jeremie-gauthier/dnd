import { ItemType } from "src/database/enums/item-type.enum";
import { Item } from "./item.entity";

export class Artifact extends Item {
  override readonly type = ItemType.ARTIFACT;
  hasSavingThrow: boolean;
}
