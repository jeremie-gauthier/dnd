import { D6, Dice, DiceRoll } from '../dice.abstract';

export const MOCK_DICE_VALUES: D6 = [1, 2, 3, 4, 5, 6];
export const MOCK_EXPECTED_DICE_ROLL: DiceRoll = {
  label: 'mock',
  maxValue: 6,
  type: 'attack',
  value: MOCK_DICE_VALUES[1],
};

export class MockDice extends Dice {
  type: 'attack' | 'special' = 'attack';
  label = 'mock';
  values: D6 = MOCK_DICE_VALUES;
  maxValue = 6;
}

export class MockDiceWithRoll extends Dice {
  type: 'attack' | 'special' = 'attack';
  label = 'mock';
  values: D6 = MOCK_DICE_VALUES;
  maxValue = 6;
  public roll(): DiceRoll {
    return MOCK_EXPECTED_DICE_ROLL;
  }
}
