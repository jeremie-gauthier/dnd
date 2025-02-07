import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  RelationId,
  Unique,
} from "typeorm";
import {
  PlayableCharacterTypeType,
  PlayableCharacterTypeValues,
} from "../enums/playable-character-type.enum";
import { Lobby } from "./lobby.entity";
import { Player } from "./player.entity";

@Entity()
@Unique(["name", "lobbyId"])
export class PlayableCharacter {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  readonly name: string;

  @Column({
    type: "enum",
    enum: PlayableCharacterTypeValues,
    enumName: "PlayableCharacterType",
    update: false,
  })
  readonly type: PlayableCharacterTypeType;

  @ManyToOne(() => Player, { nullable: true })
  pickedBy: Relation<Player> | null;

  @ManyToOne(
    () => Lobby,
    (lobby) => lobby.playableCharacters,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly lobby: Relation<Lobby>;

  @RelationId((playableCharacter: PlayableCharacter) => playableCharacter.lobby)
  readonly lobbyId: Relation<Lobby["id"]>;
}
