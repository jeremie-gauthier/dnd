import { Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { WeaponAttackDiceThrow } from "../../dice/dice-throw/weapon-attack-dice-throw.entity";
import { Weapon } from "../weapon.entity";
import { Attack } from "./attack.entity";

@Entity()
export class WeaponAttack extends Attack<Weapon> {
  @ManyToOne(
    () => Weapon,
    (weapon) => weapon.attacks,
    { onDelete: "CASCADE" },
  )
  readonly attackItem: Relation<Weapon>;

  @OneToMany(
    () => WeaponAttackDiceThrow,
    (diceThrow) => diceThrow.cause,
    { cascade: true },
  )
  readonly diceThrows: Relation<WeaponAttackDiceThrow[]>;
}
