/**
 * Checks if number is between start and stop (inclusive range).
 * @param number The number to check.
 * @param start The start of the range.
 * @param stop The end of the range.
 * @returns Returns true if number is in the range, else false.
 * @example
 * isInRange(42, 40, 50);
 * // => true
 */
export const isInRange = (
  number: number,
  start: number,
  stop: number,
): boolean => {
  const [min, max] = start <= stop ? [start, stop] : [stop, start];
  return min <= number && number <= max;
};
