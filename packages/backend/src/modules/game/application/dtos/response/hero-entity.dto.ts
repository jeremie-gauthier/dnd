import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { HeroClass, HeroClassType } from "src/database/enums/hero-class.enum";
import { PlayableEntityFaction } from "src/database/enums/playable-entity-faction.enum";
import { PlayableEntityResponseDto } from "./playable-entity.dto";

export class HeroEntityResponseDto extends PlayableEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [PlayableEntityFaction.HERO],
    enumName: "PlayableEntityFaction_Hero",
  })
  override readonly faction = PlayableEntityFaction.HERO;

  @Expose()
  @ApiProperty({ enum: HeroClass, enumName: "HeroClass" })
  readonly class: HeroClassType;

  @Expose()
  readonly level: number;

  @Expose()
  readonly imgUrl: string;
}
