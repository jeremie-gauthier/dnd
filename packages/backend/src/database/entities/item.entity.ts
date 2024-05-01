import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Item {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ update: false })
  readonly level: number;

  @Column({ update: false })
  readonly name: string;

  @Column({ update: false })
  readonly imgUrl: string;
}
