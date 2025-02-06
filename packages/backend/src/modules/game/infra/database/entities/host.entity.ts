import { Column } from "typeorm";

export class Host {
  @Column()
  readonly userId: string;
}
