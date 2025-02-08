import { Entity, ManyToOne, Relation } from "typeorm";
import { WeaponAttack } from "../../attack-item/attack/weapon-attack.entity";
import { DiceThrow } from "./dice-throw.entity";

@Entity()
export class WeaponAttackDiceThrow extends DiceThrow<WeaponAttack> {
  @ManyToOne(
    () => WeaponAttack,
    (weaponAttack) => weaponAttack.diceThrows,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly cause: Relation<WeaponAttack>;
}
