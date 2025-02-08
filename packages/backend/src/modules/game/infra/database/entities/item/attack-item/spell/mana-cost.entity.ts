import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import {
  SpellCasterHeroClassType,
  SpellCasterHeroClassValues,
} from "../../../../enums/spell-caster-hero-class.enum";

@Entity()
@Unique(["class", "cost"])
export class ManaCost {
  @PrimaryColumn()
  readonly id: string;

  @Column({
    type: "enum",
    enum: SpellCasterHeroClassValues,
    update: false,
  })
  readonly class: SpellCasterHeroClassType;

  @Column({ update: false })
  readonly cost: number;
}
