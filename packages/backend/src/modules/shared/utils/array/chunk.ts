/**
 * Creates an array of elements split into groups of length `size`. If array can't be split evenly, the final chunk will be the remaining elements.
 * @param array The array to process.
 * @param size The length of each chunk.
 * @template Item Type of the `array` elements.
 * @returns The new array of chunks.
 */
export const chunk = <Item>(array: Item[], size: number): Item[][] => {
  if (size <= 0) {
    return [];
  }

  const countChunks = Math.ceil(array.length / size);

  return Array.from({ length: countChunks }).map((_, index) => {
    const sliceStartIndex = index * size;
    const sliceEndIndex = sliceStartIndex + size;

    return array.slice(sliceStartIndex, sliceEndIndex);
  });
};
