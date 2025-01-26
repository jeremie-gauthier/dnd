import { ApiProperty } from "@nestjs/swagger";
import { HeroClass, HeroClassType } from "src/database/enums/hero-class.enum";
import { PlayableEntity } from "./playable-entity.entity";

export class HeroEntity extends PlayableEntity {
  faction: "hero";

  @ApiProperty({ enum: HeroClass, enumName: "HeroClass" })
  class: HeroClassType;

  level: number;
}
