import { LobbyViewStatusType } from "../enums/lobby.enum";
import { Config } from "./config.entity";
import { Host } from "./host.entity";
import { PlayableCharacter } from "./playable-character.entity";
import { Player } from "./player.entity";

export class Lobby {
  readonly id: string;

  readonly host: Host;

  readonly status: LobbyViewStatusType;

  readonly config: Config;

  readonly players: Array<Player>;

  readonly playableCharacters: Array<PlayableCharacter>;
}
