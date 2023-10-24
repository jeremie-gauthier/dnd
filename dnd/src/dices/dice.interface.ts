export interface DiceRoll {
  readonly type: Dice['type'];
  readonly label: Dice['label'];
  readonly value: Dice['values'][0];
  readonly maxValue: Dice['maxValue'];
}

export interface Dice {
  readonly type: 'attack' | 'special';
  readonly label: string;
  readonly values: [number, number, number, number, number, number];
  readonly maxValue: number;

  roll(): DiceRoll;
}
