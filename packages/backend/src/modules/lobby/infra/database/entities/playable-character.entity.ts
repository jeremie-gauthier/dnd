import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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
@Unique(["name", "lobby"])
export class PlayableCharacter {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  readonly name: string;

  @Column({ type: "enum", enum: PlayableCharacterTypeValues, update: false })
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
  readonly lobbyId: string;
}
