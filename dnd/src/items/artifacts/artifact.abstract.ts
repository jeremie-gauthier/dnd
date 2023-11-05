import type { Dice, DiceRoll } from '../../dices/dice.abstract';
import { Item } from '../item.abstract';

type TotalDamages = number;
export type WeaponAttackResult = [TotalDamages, DiceRoll[]];

export abstract class Artifact extends Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'artifact';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly dices: Dice[];

  public rollDice(dice: Dice): DiceRoll {
    return dice.roll();
  }
}
