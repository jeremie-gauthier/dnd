import { Dice } from '../dices/dice.abstract';
import { YellowDice } from '../dices/yellow.dice';
import { AttackType } from '../interfaces/attack-type.enum';
import { Weapon } from './weapon.abstract';

export class EldersShortbow extends Weapon {
  name = 'Arc court des anciens';
  description = `Fabriqué avec le bois d'if le plus vieux de la Forêt des elfes anciens`;
  attackType: AttackType = AttackType.Range;
  perks?: 're-roll' | 'super attack' | undefined = undefined;
  // TODO: add special dice
  dices: Dice[] = [new YellowDice(), new YellowDice()];
  superAttackDices?: Dice[] | undefined = undefined;
}
