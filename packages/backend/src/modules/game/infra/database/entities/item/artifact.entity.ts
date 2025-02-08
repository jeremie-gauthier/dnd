import { ChildEntity } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity(ItemType.ARTIFACT)
export class Artifact extends Item {
  override readonly type = ItemType.ARTIFACT;
}
