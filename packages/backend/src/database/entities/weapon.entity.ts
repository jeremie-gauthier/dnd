import { ChildEntity, Column } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Weapon extends AttackItem {
  @Column({ default: "Weapon", update: false })
  readonly type: "Weapon";
}
