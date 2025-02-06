import { Column, Entity, OneToMany, PrimaryColumn, Relation } from "typeorm";
import { LobbyStatusType, LobbyStatusValues } from "../enums/lobby.enum";
import { Config } from "./config.entity";
import { Host } from "./host.entity";
import { PlayableCharacter } from "./playable-character.entity";
import { Player } from "./player.entity";

@Entity()
export class Lobby {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column(() => Host)
  readonly host: Relation<Host>;

  @Column({
    type: "enum",
    enum: LobbyStatusValues,
    enumName: "LobbyStatus",
  })
  status: LobbyStatusType;

  @Column(() => Config)
  readonly config: Config;

  @OneToMany(
    () => Player,
    (player) => player.lobby,
    { cascade: true, nullable: false },
  )
  readonly players: Relation<Player[]>;

  @OneToMany(
    () => PlayableCharacter,
    (playableCharacter) => playableCharacter.lobby,
    { cascade: true },
  )
  readonly playableCharacters: Relation<PlayableCharacter[]>;
}
