import { Column, PrimaryGeneratedColumn } from "typeorm";

export class PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

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
