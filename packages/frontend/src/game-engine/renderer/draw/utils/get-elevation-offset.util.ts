type NonNegativeNumber<T extends number> = `${T}` extends `-${string}`
  ? never
  : number;

type Options = {
  assetHeight: number;
};

type Params<T extends number> = {
  elevationLevel: NonNegativeNumber<T>;
  options: Options;
};

export const getElevationOffset = <T extends number>({
  options,
  elevationLevel,
}: Params<T>) => {
  return options.assetHeight * elevationLevel;
};
