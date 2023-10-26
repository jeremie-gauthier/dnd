import { Dice } from './dice.abstract';

export class PurpleDice extends Dice {
  readonly type: 'attack' | 'special' = 'attack';
  readonly label: string = 'purple';
  readonly values: [number, number, number, number, number, number] = [
    2, 2, 2, 2, 3, 3,
  ];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly maxValue: number = this.values.sort().at(-1)!;
}
