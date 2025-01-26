import { StuffStorageCapacityJson } from "@dnd/shared";
import { Column, OneToMany, Relation } from "typeorm";
import { Stuff } from "./stuff.entity";

export class Inventory {
  @OneToMany(
    () => Stuff,
    (stuff) => stuff.hero,
    { cascade: true },
  )
  readonly stuff: Relation<Stuff[]>;

  @Column({ type: "json", nullable: false })
  readonly storageCapacity: StuffStorageCapacityJson;
}
