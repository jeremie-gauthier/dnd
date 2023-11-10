import type { Dice, DiceRoll } from '../../dices/dice.abstract';
import type { AttackResult } from '../../interfaces/attack-result.type';
import { AttackType } from '../../interfaces/attack-type.enum';
import type { SpellCaster } from '../../interfaces/character-class.type';
import { sum } from '../../utils/sum';
import { Item } from '../item.abstract';

export abstract class Spell extends Item {
  readonly type: 'weapon' | 'artifact' | 'spell' = 'spell';
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly attackType: AttackType;
  abstract readonly perks?: 're-roll' | 'super attack';
  abstract readonly dices: Dice[];
  abstract readonly superAttackDices?: Dice[];
  abstract readonly manaCost: Readonly<Record<SpellCaster, number>>;

  public getManaCost(characterClass: SpellCaster) {
    return this.manaCost[characterClass];
  }

  public rollAttack(): AttackResult {
    const diceRolls = this.dices.map((dice) => dice.roll());
    return this.getSpellAttackResult(diceRolls);
  }

  public rollSuperAttack(): AttackResult {
    if (!this.superAttackDices) {
      throw new Error(`No super attack for this weapon`);
    }

    const diceRolls = this.superAttackDices.map((dice) => dice.roll());
    return this.getSpellAttackResult(diceRolls);
  }

  private getSpellAttackResult(diceRolls: DiceRoll[]): AttackResult {
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
