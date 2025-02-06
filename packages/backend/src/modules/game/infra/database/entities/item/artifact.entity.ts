import { ChildEntity, Column } from "typeorm";
import { ItemType } from "../../enums/item-type.enum";
import { Item } from "./item.entity";

@ChildEntity()
export class Artifact extends Item {
  @Column({ default: ItemType.ARTIFACT, update: false })
  override readonly type = ItemType.ARTIFACT;

  @Column()
  readonly hasSavingThrow: boolean;
}
