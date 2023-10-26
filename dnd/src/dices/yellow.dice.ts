import { Dice } from './dice.abstract';

export class YellowDice extends Dice {
  readonly type: 'attack' | 'special' = 'attack';
  readonly label: string = 'yellow';
  readonly values: [number, number, number, number, number, number] = [
    0, 0, 1, 1, 1, 1,
  ];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly maxValue: number = this.values.sort().at(-1)!;
}
