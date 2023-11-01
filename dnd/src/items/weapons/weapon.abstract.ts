import type { Dice, DiceRoll } from '../../dices/dice.abstract';
import type { AttackResult } from '../../interfaces/attack-result.type';
import { AttackType } from '../../interfaces/attack-type.enum';
import { sum } from '../../utils/sum';
import { Item } from '../item.abstract';

export abstract class Weapon extends Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'weapon';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly attackType: AttackType;
  abstract readonly perks?: 're-roll' | 'super attack';
  abstract readonly dices: Dice[];
  abstract readonly superAttackDices?: Dice[];

  public rollAttack(): AttackResult {
    const diceRolls = this.dices.map((dice) => dice.roll());
    return this.getWeaponAttackResult(diceRolls);
  }

  public rollSuperAttack(): AttackResult {
    if (!this.superAttackDices) {
      throw new Error(`No super attack for this weapon`);
    }

    const diceRolls = this.superAttackDices.map((dice) => dice.roll());
    return this.getWeaponAttackResult(diceRolls);
  }

  private getWeaponAttackResult(diceRolls: DiceRoll[]): AttackResult {
    const totalDamages = sum(
      ...diceRolls
        .filter(({ type }) => type === 'attack')
        .map(({ value }) => value),
    );
    return [totalDamages, diceRolls];
  }

  public rerollDice(dice: Dice): DiceRoll {
    // TODO: if have 're-roll' perk
    return dice.roll();
  }
}
