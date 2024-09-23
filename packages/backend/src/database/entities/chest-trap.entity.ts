import { ChildEntity, Column, Index } from "typeorm";
import { Item } from "./item.entity";

@ChildEntity()
export class ChestTrap extends Item {
  @Index()
  @Column({ default: "ChestTrap", update: false })
  readonly type: "ChestTrap";
}
