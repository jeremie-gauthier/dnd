import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AttackDice {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  // @ManyToOne(() => Attack, attack => attack.attackDices)
}
