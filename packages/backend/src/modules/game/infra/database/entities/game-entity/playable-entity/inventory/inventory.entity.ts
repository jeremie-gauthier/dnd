import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { InventoryItem } from "./inventory-item.entity";
import { StorageCapacity } from "./storage-capacity.entity";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @OneToMany(
    () => InventoryItem,
    (inventoryItem) => inventoryItem.inventory,
    { cascade: true },
  )
  readonly inventoryItems: Relation<InventoryItem[]>;

  @Column(() => StorageCapacity)
  readonly storageCapacity: Relation<StorageCapacity>;
}
