import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";
import { ItemTypeType, ItemTypeValues } from "../enums/item-type.enum";

@Entity()
@TableInheritance({ column: "type" })
export class Item {
  @PrimaryColumn()
  readonly name: string;

  @Column({ type: "enum", enum: ItemTypeValues, update: false })
  readonly type: ItemTypeType;

  @Column({ update: false })
  readonly level: number;

  @Column({ update: false })
  readonly isLootableInChest: boolean;
}
