import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class HeroUI {
  @PrimaryColumn({ update: false })
  readonly name: string;

  @Column({ update: false })
  readonly imgUrl: string;
}
