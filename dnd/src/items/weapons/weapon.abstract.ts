import type { Dice, DiceRoll } from '../../dices/dice.abstract';
import { AttackType } from '../../interfaces/attack-type.enum';
import { sum } from '../../utils/sum';
import { Item } from '../item.abstract';

type TotalDamages = number;
export type WeaponAttackResult = [TotalDamages, DiceRoll[]];

export abstract class Weapon implements Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'weapon';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly attackType: AttackType;
  abstract readonly perks?: 're-roll' | 'super attack';
  abstract readonly dices: Dice[];
  abstract readonly superAttackDices?: Dice[];

  public rollAttack(): WeaponAttackResult {
    const diceRolls = this.dices.map((dice) => dice.roll());
    return this.getWeaponAttackResult(diceRolls);
  }

  public rollSuperAttack(): WeaponAttackResult {
    if (!this.superAttackDices) {
      throw new Error(`No super attack for this weapon`);
    }

    const diceRolls = this.superAttackDices.map((dice) => dice.roll());
    return this.getWeaponAttackResult(diceRolls);
  }

  private getWeaponAttackResult(diceRolls: DiceRoll[]): WeaponAttackResult {
    const totalDamages = sum(
      ...diceRolls
        .filter(({ type }) => type === 'attack')
        .map(({ value }) => value),
    );
    return [totalDamages, diceRolls];
  }

  public rerollDice(dice: Dice): DiceRoll {
    return dice.roll();
  }
}
