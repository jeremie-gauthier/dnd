import { D6, Dice } from './dice.abstract';

export class OrangeDice extends Dice {
  readonly type: 'attack' | 'special' = 'attack';
  readonly label: string = 'orange';
  readonly values: D6 = [1, 1, 1, 1, 2, 2];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly maxValue: number = this.values.sort().at(-1)!;
}
