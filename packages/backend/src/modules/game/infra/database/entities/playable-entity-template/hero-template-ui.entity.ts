import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from "typeorm";
import { HeroTemplate } from "./hero-template.entity";

@Entity()
export class HeroTemplateUI {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => HeroTemplate)
  readonly heroTemplate: Relation<HeroTemplate>;

  @Column({ update: false })
  readonly imgUrl: string;
}
