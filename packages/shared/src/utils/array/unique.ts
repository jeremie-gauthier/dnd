/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @template Item Type of the `array` elements.
 * @returns The new duplicate free array.
 * @example
 * unique([1, 1, 2, 1, 3, 4, 4, 5]);
 * // => [1, 2, 3, 4, 5]
 */
export const unique = <Item>(array: Item[]): Item[] => {
  return [...new Set(array)];
};
