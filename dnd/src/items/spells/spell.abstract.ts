import type { Dice, DiceRoll } from '../../dices/dice.abstract';
import { AttackType } from '../../interfaces/attack-type.enum';
import type { SpellCaster } from '../../interfaces/character-class.type';
import { Item } from '../item.abstract';

export abstract class Spell implements Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'spell';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly attackType: AttackType;
  abstract readonly perks?: 're-roll' | 'super attack';
  abstract readonly dices: Dice[];
  abstract readonly superAttackDices?: Dice[];
  abstract readonly manaCost: Readonly<Record<SpellCaster, number>>;

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
