import { EnemyKind, InventoryJson } from "@dnd/shared";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Characteristic } from "./characteristic";

@Entity()
export class EnemyTemplate {
  @PrimaryColumn()
  readonly name: EnemyKind;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @Column({ type: "json" })
  readonly inventory: InventoryJson;
}
