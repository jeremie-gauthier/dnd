import { describe, expect, it } from 'vitest';
import { chunk } from './chunk';

describe('array: chunk', () => {
  it('should create an array of array of pre-defined size', () => {
    const input = [1, 2, 3, 4, 5, 6];

    expect(chunk(input, 6)).toStrictEqual([[1, 2, 3, 4, 5, 6]]);
    expect(chunk(input, 5)).toStrictEqual([[1, 2, 3, 4, 5], [6]]);
    expect(chunk(input, 4)).toStrictEqual([
      [1, 2, 3, 4],
      [5, 6],
    ]);
    expect(chunk(input, 3)).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(chunk(input, 2)).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(chunk(input, 1)).toStrictEqual([[1], [2], [3], [4], [5], [6]]);
    expect(chunk([], 1)).toStrictEqual([]);
    expect(chunk([], 3)).toStrictEqual([]);
  });

  it('should return an empty array in case of chunk size <= 0', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = chunk(input, 0);
    expect(result).toStrictEqual([]);
  });

  it('should not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5, 6];
    chunk(input, 2);
    expect(input).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
