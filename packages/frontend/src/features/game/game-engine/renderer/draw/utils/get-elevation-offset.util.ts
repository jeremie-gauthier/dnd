import type { NonNegativeNumber } from "@dnd/shared";

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
