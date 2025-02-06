import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  LobbyStatus,
  LobbyStatusType,
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
  @ApiProperty({ enum: LobbyStatus, enumName: "LobbyStatus" })
  readonly status: LobbyStatusType;

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
