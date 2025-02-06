import { Column } from "typeorm";

export class GameMaster {
  @Column()
  readonly userId: string;
}
