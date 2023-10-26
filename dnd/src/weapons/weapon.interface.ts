import type { Dice, DiceRoll } from '../dices/dice.abstract';

export abstract class Weapon {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly type: 'melee' | 'range';
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
