import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { PlayableEntity } from "../playable-entity.entity";
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

  @OneToOne(() => PlayableEntity, { nullable: false })
  readonly playableEntity: Relation<PlayableEntity>;
}
