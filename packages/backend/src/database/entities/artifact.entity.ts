import { ChildEntity, Column, Index } from "typeorm";
import { Item } from "./item.entity";

@ChildEntity()
export class Artifact extends Item {
  @Index()
  @Column({ default: "Artifact", update: false })
  readonly type: "Artifact";

  @Column()
  readonly hasSavingThrow: boolean;
}
