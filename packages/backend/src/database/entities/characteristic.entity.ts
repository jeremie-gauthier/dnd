import { Column } from "typeorm";

export class Characteristic {
  @Column()
  readonly baseHealthPoints: number;

  @Column()
  readonly baseManaPoints: number;

  @Column()
  readonly baseArmorClass: number;

  @Column()
  readonly baseMovementPoints: number;

  @Column()
  readonly baseActionPoints: number;
}
