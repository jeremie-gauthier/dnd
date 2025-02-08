import { Column } from "typeorm";

export class Characteristic {
  @Column()
  healthPoints: number;

  @Column()
  manaPoints: number;

  @Column()
  armorClass: number;

  @Column()
  movementPoints: number;

  @Column()
  actionPoints: number;
}
