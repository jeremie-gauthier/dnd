import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  SpellCasterHeroClass,
  SpellCasterHeroClassType,
} from "src/modules/game/infra/database/enums/spell-caster-hero-class.enum";

export class ManaCostResponseDto {
  @Expose()
  @ApiProperty({
    enum: SpellCasterHeroClass,
    enumName: "SpellCasterHeroClass",
  })
  readonly class: SpellCasterHeroClassType;

  @Expose()
  readonly cost: number;
}
