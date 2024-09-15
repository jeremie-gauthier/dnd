import { useMemo } from "react";

type Params = {
  mapWidth: number;
  mapHeight: number;
  assetSize: number;
};

export const useCanvasSize = ({ mapWidth, mapHeight, assetSize }: Params) => {
  const size = useMemo(
    () => Math.max(mapWidth, mapHeight),
    [mapWidth, mapHeight],
  );

  const height = useMemo(
    () => (size * assetSize) / 2 + assetSize / 2,
    [size, assetSize],
  );
  const width = useMemo(() => size * assetSize, [size, assetSize]);

  return { height, width };
};
