import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({ column: "type" })
export class Item {
  @PrimaryColumn()
  readonly name: string;

  @Column({ update: false })
  readonly type: "Weapon" | "Spell";

  @Column({ update: false })
  readonly level: number;
}
