import { Column } from "typeorm";

export class Coord {
  @Column()
  readonly row: number;

  @Column()
  readonly column: number;
}
