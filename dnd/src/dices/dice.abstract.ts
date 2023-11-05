import { randChoice } from '../utils/rand-choice';

export interface DiceRoll {
  readonly type: Dice['type'];
  readonly label: Dice['label'];
  readonly value: Dice['values'][0];
  readonly maxValue: Dice['maxValue'];
}

export type D6 = [number, number, number, number, number, number];

export abstract class Dice {
  abstract readonly type: 'attack' | 'special';
  abstract readonly label: string;
  abstract readonly values: D6;
  abstract readonly maxValue: number;

  public roll(): DiceRoll {
    const randValue = randChoice(this.values);
    if (randValue === undefined) {
      throw new Error(`Got undefined value while rolling a dice`);
    }

    return {
      type: this.type,
      label: this.label,
      value: randValue,
      maxValue: this.maxValue,
    };
  }
}
