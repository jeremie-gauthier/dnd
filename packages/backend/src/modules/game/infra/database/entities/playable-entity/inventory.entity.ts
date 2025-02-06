import { Column, Entity, OneToMany, Relation } from "typeorm";
import { StorageCapacity } from "./storage-capacity.entity";
import { Stuff } from "./stuff.entity";

@Entity()
export class Inventory {
  @OneToMany(
    () => Stuff,
    (stuff) => stuff.inventory,
    { cascade: true },
  )
  readonly stuff: Relation<Stuff[]>;

  @Column(() => StorageCapacity)
  readonly storageCapacity: Relation<StorageCapacity>;
}
