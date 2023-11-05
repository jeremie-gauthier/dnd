import { afterEach, describe, expect, it, vi } from 'vitest';
import { randChoice } from './rand-choice';

describe('utils: randChoice', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should returns a random element of the array', () => {
    const mockReturnValue = 0.5;
    const spy = vi
      .spyOn(Math, 'random')
      .mockImplementation(() => mockReturnValue);
    const array = [1, 2, 3, 4, 5, 6];

    const result = randChoice(array);
    const expected = array[3];

    expect(result).toEqual(expected);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(mockReturnValue);
  });

  it('should randomly returns the first element of the array', () => {
    const mockReturnValue = 0;
    const spy = vi
      .spyOn(Math, 'random')
      .mockImplementation(() => mockReturnValue);
    const array = [1, 2, 3, 4, 5, 6];

    const result = randChoice(array);
    const expected = array[0];

    expect(result).toEqual(expected);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(mockReturnValue);
  });

  it('should randomly returns the last element of the array', () => {
    const mockReturnValue = 0.9;
    const spy = vi
      .spyOn(Math, 'random')
      .mockImplementation(() => mockReturnValue);
    const array = [1, 2, 3, 4, 5, 6];

    const result = randChoice(array);
    const expected = array[5];

    expect(result).toEqual(expected);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(mockReturnValue);
  });
});
