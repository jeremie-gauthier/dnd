import { Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { SpellAttackDiceThrow } from "../../dice/dice-throw/spell-attack-dice-throw.entity";
import { Spell } from "../spell/spell.entity";
import { Attack } from "./attack.entity";

@Entity()
export class SpellAttack extends Attack<Spell> {
  @ManyToOne(
    () => Spell,
    (spell) => spell.attacks,
    { onDelete: "CASCADE" },
  )
  readonly attackItem: Relation<Spell>;

  @OneToMany(
    () => SpellAttackDiceThrow,
    (diceThrow) => diceThrow.cause,
    { cascade: true },
  )
  readonly diceThrows: Relation<SpellAttackDiceThrow[]>;
}
