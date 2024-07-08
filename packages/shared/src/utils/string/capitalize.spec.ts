import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('string: capitalize', () => {
  it('should returns the capitalized version of the given string', () => {
    const string = 'paris';
    const expected = 'Paris';
    expect(capitalize(string)).toEqual(expected);
  });

  it('should not fail on empty strings', () => {
    const string = '';
    const expected = '';
    expect(capitalize(string)).toEqual(expected);
  });

  it('should not mutate the original string', () => {
    const string = 'paris';
    capitalize(string);
    expect(string).toEqual('paris');
  });
});
