export type NonNegativeNumber<T extends number> = `${T}` extends `-${string}`
  ? never
  : number;
