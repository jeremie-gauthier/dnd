import { ChildEntity, Column, Index } from "typeorm";
import { Item } from "./item.entity";

@ChildEntity()
export class Potion extends Item {
  @Index()
  @Column({ default: "Potion", update: false })
  readonly type: "Potion";
}
