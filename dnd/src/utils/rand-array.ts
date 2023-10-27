export const randArray = <T>(array: T[]) =>
  [...array].sort(() => Math.random() - Math.random());
