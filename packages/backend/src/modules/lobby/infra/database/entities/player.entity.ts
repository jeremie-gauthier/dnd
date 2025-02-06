import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { Lobby } from "./lobby.entity";
import { PlayableCharacter } from "./playable-character.entity";

@Entity()
export class Player {
  @PrimaryColumn()
  readonly userId: string;

  @Column()
  readonly isReady: boolean;

  @OneToMany(
    () => PlayableCharacter,
    (playableCharacter) => playableCharacter.pickedBy,
    { cascade: true },
  )
  readonly playableCharacters: Relation<PlayableCharacter[]>;

  @ManyToOne(
    () => Lobby,
    (lobby) => lobby.players,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly lobby: Relation<Lobby>;
}
