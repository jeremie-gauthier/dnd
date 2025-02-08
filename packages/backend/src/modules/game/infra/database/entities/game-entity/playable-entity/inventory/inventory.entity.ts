import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { InventoryItem } from "./inventory-item.entity";
import { StorageCapacity } from "./storage-capacity.entity";

@Entity()
export class Inventory {
  @PrimaryColumn("uuid")
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
