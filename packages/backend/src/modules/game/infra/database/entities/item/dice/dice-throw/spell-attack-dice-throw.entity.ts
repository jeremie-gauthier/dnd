import { Entity, ManyToOne, Relation } from "typeorm";
import { SpellAttack } from "../../attack-item/attack/spell-attack.entity";
import { DiceThrow } from "./dice-throw.entity";

@Entity()
export class SpellAttackDiceThrow extends DiceThrow<SpellAttack> {
  @ManyToOne(
    () => SpellAttack,
    (spellAttack) => spellAttack.diceThrows,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly cause: Relation<SpellAttack>;
}
