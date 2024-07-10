import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Perk {
  @PrimaryColumn({ unique: true })
  readonly name: string;
}
