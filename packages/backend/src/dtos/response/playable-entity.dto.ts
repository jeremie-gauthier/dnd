import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { HeroClass, HeroClassType } from "src/database/enums/hero-class.enum";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
} from "src/database/enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
} from "src/database/enums/playable-entity-type.enum";

export class PlayableEntityResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  readonly type: PlayableEntityTypeType;

  @Expose()
  @ApiProperty({ enum: PlayableEntityRace, enumName: "PlayableEntityRace" })
  readonly race: PlayableEntityRaceType;

  @Expose()
  readonly name: string;

  @Expose()
  @ApiProperty({ enum: HeroClass, enumName: "HeroClass" })
  readonly class: HeroClassType;

  @Expose()
  readonly level: number;
}
