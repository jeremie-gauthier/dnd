import { Dice } from '../../dices/dice.abstract';
import { OrangeDice } from '../../dices/orange.dice';
import { YellowDice } from '../../dices/yellow.dice';
import { AttackType } from '../../interfaces/attack-type.enum';
import { Weapon } from './weapon.abstract';

export class GoblinMace extends Weapon {
  name = 'Massue gobeline';
  description = 'Une massue rudimentaire';
  attackType: AttackType = AttackType.Melee;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  dices: Dice[] = [new YellowDice(), new YellowDice(), new OrangeDice()];
  superAttackDices?: Dice[] | undefined = undefined;
}
