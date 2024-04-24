import { describe, expect, it } from 'vitest';
import { isInRange } from './is-in-range';

describe('number: isInRange', () => {
  describe('when min <= number <= max', () => {
    it('should return true', () => {
      const lowerBound = 0;
      const upperBound = 3;

      expect(isInRange(0, lowerBound, upperBound)).toBe(true);
      expect(isInRange(1, lowerBound, upperBound)).toBe(true);
      expect(isInRange(2, lowerBound, upperBound)).toBe(true);
      expect(isInRange(3, lowerBound, upperBound)).toBe(true);
    });

    it('should still works when args are mixed up', () => {
      const lowerBound = 0;
      const upperBound = 3;

      expect(isInRange(0, upperBound, lowerBound)).toBe(true);
      expect(isInRange(1, upperBound, lowerBound)).toBe(true);
      expect(isInRange(2, upperBound, lowerBound)).toBe(true);
      expect(isInRange(3, upperBound, lowerBound)).toBe(true);
    });
  });

  describe('when number not in range [min, max]', () => {
    it('should return false if number not in range [min, max]', () => {
      const lowerBound = 0;
      const upperBound = 3;

      expect(isInRange(-1, lowerBound, upperBound)).toBe(false);
      expect(isInRange(4, lowerBound, upperBound)).toBe(false);
    });

    it('should still works when args are mixed up', () => {
      const lowerBound = 0;
      const upperBound = 3;

      expect(isInRange(-1, upperBound, lowerBound)).toBe(false);
      expect(isInRange(4, upperBound, lowerBound)).toBe(false);
    });
  });
});
