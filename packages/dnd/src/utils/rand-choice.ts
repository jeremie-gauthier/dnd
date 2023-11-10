export function randChoice<T>(array: T[]) {
  const randIndex = Math.trunc(Math.random() * array.length);
  return array[randIndex];
}
