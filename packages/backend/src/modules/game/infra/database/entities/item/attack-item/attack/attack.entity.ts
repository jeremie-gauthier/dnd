import {
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  AttackRangeType,
  AttackRangeValues,
} from "../../../../enums/attack-range.enum";
import {
  AttackTypeType,
  AttackTypeValues,
} from "../../../../enums/attack-type.enum";
import { DiceThrow } from "../../dice/dice-throw/dice-throw.entity";
import { Perk } from "../../perk.entity";
import { Spell } from "../spell/spell.entity";
import { Weapon } from "../weapon.entity";
import { SpellAttack } from "./spell-attack.entity";
import { WeaponAttack } from "./weapon-attack.entity";

export abstract class Attack<TAttackItem extends Weapon | Spell> {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: AttackRangeValues, update: false })
  readonly range: AttackRangeType;

  @Column({ type: "enum", enum: AttackTypeValues, update: false })
  readonly type: AttackTypeType;

  abstract readonly attackItem: Relation<TAttackItem>;
  abstract readonly diceThrows: Relation<
    DiceThrow<TAttackItem extends Weapon ? WeaponAttack : SpellAttack>[]
  >;

  @ManyToMany(() => Perk)
  @JoinTable()
  readonly perks: Relation<Perk[]>;
}
