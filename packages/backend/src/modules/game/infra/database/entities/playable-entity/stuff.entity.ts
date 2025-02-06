import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  StorageSpaceType,
  StorageSpaceValues,
} from "../../enums/storage-space.enum";
import { ItemPersistence } from "../../interfaces/item-persistence.interface";
import { Item } from "../item/item.entity";
import { Inventory } from "./inventory.entity";

@Entity()
export class Stuff {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: StorageSpaceValues, enumName: "StorageSpace" })
  storageSpace: StorageSpaceType;

  @ManyToOne(() => Item, { onDelete: "CASCADE", nullable: false })
  item: Relation<ItemPersistence>;

  @ManyToOne(() => Inventory, { onDelete: "CASCADE", nullable: false })
  readonly inventory: Relation<Inventory>;
}
