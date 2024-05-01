import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Item {
  @PrimaryColumn()
  readonly name: string;

  @Column({ update: false })
  readonly level: number;

  @Column({ update: false })
  readonly imgUrl: string;
}
