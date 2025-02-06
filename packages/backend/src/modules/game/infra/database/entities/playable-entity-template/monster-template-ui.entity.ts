import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { MonsterTemplate } from "./monster-template.entity";

@Entity()
export class MonsterTemplateUI {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => MonsterTemplate)
  readonly name: Relation<MonsterTemplate>;

  @Column({ update: false })
  readonly imgUrl: string;
}
