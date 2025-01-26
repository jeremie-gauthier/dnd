import { ApiProperty } from "@nestjs/swagger";
import { LobbyViewStatus, LobbyViewStatusType } from "../enums/lobby.enum";
import { Config } from "./config.entity";
import { Host } from "./host.entity";
import { PlayableCharacter } from "./playable-character.entity";
import { Player } from "./player.entity";

export class Lobby {
  readonly id: string;

  readonly host: Host;

  @ApiProperty({ enum: LobbyViewStatus, enumName: "LobbyViewStatus" })
  readonly status: LobbyViewStatusType;

  readonly config: Config;

  readonly players: Array<Player>;

  readonly playableCharacters: Array<PlayableCharacter>;
}
