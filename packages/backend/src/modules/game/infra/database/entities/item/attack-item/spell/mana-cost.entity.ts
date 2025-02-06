import { Entity, PrimaryColumn } from "typeorm";
import {
  SpellCasterHeroClassType,
  SpellCasterHeroClassValues,
} from "../../../../enums/spell-caster-hero-class.enum";

@Entity()
export class ManaCost {
  @PrimaryColumn({
    type: "enum",
    enum: SpellCasterHeroClassValues,
    enumName: "SpellCasterHeroClass",
    update: false,
  })
  readonly class: SpellCasterHeroClassType;

  @PrimaryColumn({ update: false })
  readonly cost: number;
}
