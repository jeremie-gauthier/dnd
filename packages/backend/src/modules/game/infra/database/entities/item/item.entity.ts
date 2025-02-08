import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import { ItemTypeType, ItemTypeValues } from "../../enums/item-type.enum";
import { ItemPerk } from "./item-perk.entity";

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

  @ManyToMany(() => ItemPerk, { cascade: true })
  @JoinTable()
  readonly itemPerks: Relation<ItemPerk[]>;
}
