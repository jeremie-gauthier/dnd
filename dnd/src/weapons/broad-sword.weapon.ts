import { Dice } from '../dices/dice.abstract';
import { OrangeDice } from '../dices/orange.dice';
import { AttackType } from '../interfaces/attack-type.enum';
import { Weapon } from './weapon.abstract';

export class BroadSword extends Weapon {
  name = 'Épée large';
  description =
    'Une lame puissante et légère, bien équilibrée, parfaite pour le combat au corps à corps';
  attackType: AttackType = AttackType.Melee;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  dices: Dice[] = [new OrangeDice()];
  superAttackDices?: Dice[] | undefined = undefined;
}
