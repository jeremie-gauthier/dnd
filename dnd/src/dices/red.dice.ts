import { Dice } from './dice.abstract';

export class RedDice extends Dice {
  readonly type: 'attack' | 'special' = 'attack';
  readonly label: string = 'red';
  readonly values: [number, number, number, number, number, number] = [
    0, 0, 1, 2, 2, 3,
  ];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly maxValue: number = this.values.sort().at(-1)!;
}
