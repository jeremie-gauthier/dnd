import { describe, expect, it } from 'vitest';
import { isEmpty } from './is-empty';

describe('array: isEmpty', () => {
  it('should return true on array of length 0', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return false on array of length 1 or more', () => {
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty(['a', 'b', 'c'])).toBe(false);
    expect(isEmpty([{}, {}])).toBe(false);
    expect(isEmpty(Array.from({ length: 2 }))).toBe(false);
  });
});
