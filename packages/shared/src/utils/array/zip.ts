/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 * Zip elements up to the array with the min length.
 * @param left The first array to process.
 * @param right The second array to process.
 * @template LeftItem Type of the `left` array elements.
 * @template RightItem Type of the `right` array elements.
 * @returns Returns the new array of grouped elements.
 * @example
 * zip([1, 2, 3], ['a', 'b', 'c']);
 * // => [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 */
export const zip = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);

  return Array.from({ length: minLength }).map((_, index) => [
    left[index] as LeftItem,
    right[index] as RightItem,
  ]);
};
