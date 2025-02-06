import { Column, Entity, PrimaryColumn } from "typeorm";

type D6 = [number, number, number, number, number, number];

@Entity()
export class Dice {
  @PrimaryColumn({ unique: true })
  readonly name: string;

  @Column({ type: "json", update: false })
  readonly values: D6;

  @Column({ update: false })
  readonly minValue: number;

  @Column({ update: false })
  readonly maxValue: number;

  @Column({ type: "float", update: false })
  readonly meanValue: number;
}
