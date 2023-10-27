import type { Dice, DiceRoll } from '../dices/dice.abstract';
import { AttackType } from '../interfaces/attack-type.enum';
import { Item } from '../inventory/item.abstract';

export abstract class Weapon implements Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'weapon';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly attackType: AttackType;
  abstract readonly perks?: 're-roll' | 'super attack';
  abstract readonly dices: Dice[];
  abstract readonly superAttackDices?: Dice[];

  public rollAttack(): DiceRoll[] {
    return this.dices.map((dice) => dice.roll());
  }

  public rollSuperAttack(): DiceRoll[] {
    if (!this.superAttackDices) {
      throw new Error(`No super attack for this weapon`);
    }

    return this.superAttackDices.map((dice) => dice.roll());
  }

  public rerollDice(dice: Dice): DiceRoll {
    return dice.roll();
  }
}
