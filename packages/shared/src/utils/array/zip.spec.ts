import { describe, expect, it } from 'vitest';
import { zip } from './zip';

describe('array: zip', () => {
  it('should return duplicate free version of the given array', () => {
    const leftArray = [1, 2, 3, 4, 5];
    const rightArray = ['a', 'b', 'c', 'd', 'e'];

    const result = zip(leftArray, rightArray);
    const expected = [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
      [5, 'e'],
    ];

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the originals arrays', () => {
    const leftArray = [1, 2, 3, 4, 5];
    const rightArray = ['a', 'b', 'c', 'd', 'e'];

    zip(leftArray, rightArray);

    expect(leftArray).toStrictEqual([1, 2, 3, 4, 5]);
    expect(rightArray).toStrictEqual(['a', 'b', 'c', 'd', 'e']);
  });
});
