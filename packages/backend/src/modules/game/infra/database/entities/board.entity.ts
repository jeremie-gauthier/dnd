import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { GameTemplate } from "./game-template.entity";
import { Game } from "./game.entity";
import { Tile } from "./tile.entity";

@Entity()
export class Board {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  readonly width: number;

  @Column()
  readonly height: number;

  @OneToMany(
    () => Tile,
    (tile) => tile.board,
    { cascade: true },
  )
  readonly tiles: Relation<Tile[]>;

  @OneToOne(() => Game)
  readonly game: Relation<Game>;

  @OneToOne(() => GameTemplate)
  readonly gameTemplate: Relation<GameTemplate>;
}
