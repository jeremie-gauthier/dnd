import { ChildEntity, Column } from "typeorm";
import { AttackItem } from "./attack-item.entity";

@ChildEntity()
export class Weapon extends AttackItem {
  @Column({ default: "weapon", update: false })
  readonly type: "weapon";
}
