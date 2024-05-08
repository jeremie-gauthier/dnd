import { describe, expect, it } from 'vitest';
import { unique } from './unique';

describe('array: unique', () => {
  it('should return duplicate free version of the given array', () => {
    const initialArray = [1, 1, 2, 3, 4, 5, 4];

    const result = unique(initialArray);
    const expected = [1, 2, 3, 4, 5];

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the original array', () => {
    const initialArray = [1, 1, 2, 3, 4, 5, 4];

    unique(initialArray);
    const expected = [1, 1, 2, 3, 4, 5, 4];

    expect(initialArray).toStrictEqual(expected);
  });
});
