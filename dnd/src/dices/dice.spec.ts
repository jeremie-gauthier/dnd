import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_EXPECTED_DICE_ROLL, MockDice } from './fixtures/dice.fixture';

describe('dices: Dice', () => {
  beforeEach(() => {
    vi.mock('../utils/rand-choice');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('method: roll', () => {
    it('should returns a random value picked from the `values` attribute', async () => {
      const dice = new MockDice();

      const randModule = await import('../utils/rand-choice');
      randModule.randChoice = vi.fn().mockReturnValue(dice.values[1]);

      const result = dice.roll();
      const expected = MOCK_EXPECTED_DICE_ROLL;

      expect(result).toEqual(expected);
    });

    it('should throws an error if the random value is undefined', async () => {
      const randModule = await import('../utils/rand-choice');
      randModule.randChoice = vi.fn().mockReturnValue(undefined);

      const dice = new MockDice();

      const result = () => dice.roll();
      const expected = /^Got undefined value while rolling a dice$/;

      expect(result).toThrowError(expected);
    });
  });
});
