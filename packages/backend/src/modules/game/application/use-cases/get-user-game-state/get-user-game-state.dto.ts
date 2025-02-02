import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { PlayableEntity } from "src/modules/game/infra/database/entities/playable-entity/playable-entity.entity";
import {
  CurrentPhase,
  CurrentPhaseType,
} from "src/modules/game/infra/database/enums/current-phase.enum";
import { GameResponseDto } from "../../dtos/response/game.dto";

export class GetUserGameStateInputParamsDto {
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;
}

class PlayerCurrentlyPlayingDto {
  @Expose()
  readonly userId: string;

  @Expose()
  readonly entityId: PlayableEntity["id"];
}

export class GetUserGameStateOutputDto {
  @Expose()
  readonly game: GameResponseDto;

  @Expose()
  @ApiProperty({ enum: CurrentPhase, enumName: "CurrentPhase" })
  readonly yourStatus: CurrentPhaseType;

  @Expose()
  @Type(() => PlayerCurrentlyPlayingDto)
  readonly playerCurrentlyPlaying: PlayerCurrentlyPlayingDto;
}
