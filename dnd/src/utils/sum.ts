const INITIAL_VALUE = 0;

/**
 * Compute the sum of the given numbers.
 * @param numbers The numbers to sum.
 * @returns The sum of the numbers.
 * @example
 * sum(1, 2, 3, 4, 5);
 * // => 15
 */
export const sum = (...numbers: number[]): number =>
  numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    INITIAL_VALUE,
  );
