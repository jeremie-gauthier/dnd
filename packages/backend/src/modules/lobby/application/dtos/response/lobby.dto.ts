import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  LobbyViewStatus,
  LobbyViewStatusType,
} from "src/modules/lobby/infra/database/enums/lobby.enum";
import { ConfigResponseDto } from "./config.dto";
import { HostResponseDto } from "./host.dto";
import { PlayableCharacterResponseDto } from "./playable-character.dto";
import { PlayerResponseDto } from "./player.dto";

export class LobbyResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Type(() => HostResponseDto)
  readonly host: HostResponseDto;

  @Expose()
  @ApiProperty({ enum: LobbyViewStatus, enumName: "LobbyViewStatus" })
  readonly status: LobbyViewStatusType;

  @Expose()
  @Type(() => ConfigResponseDto)
  readonly config: ConfigResponseDto;

  @Expose()
  @Type(() => PlayerResponseDto)
  readonly players: Array<PlayerResponseDto>;

  @Expose()
  @Type(() => PlayableCharacterResponseDto)
  readonly playableCharacters: Array<PlayableCharacterResponseDto>;
}
