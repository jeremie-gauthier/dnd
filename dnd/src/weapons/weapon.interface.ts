import { Dice, DiceRoll } from '../dices/dice.interface';

export interface Weapon {
  readonly type: 'melee' | 'range';
  readonly perks?: 're-roll' | 'super attack';

  rollAttack(): DiceRoll[];
  rollSuperAttack?(): DiceRoll[];
  rerollDice?(dice: Dice): DiceRoll;
}
