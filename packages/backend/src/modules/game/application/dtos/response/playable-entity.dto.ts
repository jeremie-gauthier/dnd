import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  CurrentPhase,
  CurrentPhaseType,
} from "src/modules/game/infra/database/enums/current-phase.enum";
import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
} from "src/modules/game/infra/database/enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
} from "src/modules/game/infra/database/enums/playable-entity-type.enum";
import { CharacteristicResponseDto } from "./characteristic.dto";
import { CoordResponseDto } from "./coord.dto";

export abstract class PlayableEntityResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({
    enum: PlayableEntityFaction,
    enumName: "PlayableEntityFaction",
  })
  abstract readonly faction: PlayableEntityFactionType;

  @Expose()
  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  readonly type: PlayableEntityTypeType;

  @Expose()
  @ApiProperty({ enum: PlayableEntityRace, enumName: "PlayableEntityRace" })
  readonly race: PlayableEntityRaceType;

  @Expose()
  @ApiProperty({ enum: CurrentPhase, enumName: "CurrentPhase" })
  readonly currentPhase: CurrentPhaseType;

  @Expose()
  readonly playedByUserId: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly initiative: number;

  @Expose()
  readonly coord: CoordResponseDto;

  @Expose()
  readonly isBlocking: boolean;

  @Expose()
  @Type(() => CharacteristicResponseDto)
  readonly baseCharacteristic: CharacteristicResponseDto;

  @Expose()
  @Type(() => CharacteristicResponseDto)
  readonly characteristic: CharacteristicResponseDto;
}
