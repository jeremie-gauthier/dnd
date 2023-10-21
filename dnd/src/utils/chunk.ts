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
