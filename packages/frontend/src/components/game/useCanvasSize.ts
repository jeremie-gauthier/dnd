import { useMemo } from "react";

type Params = {
  mapWidth: number;
  mapHeight: number;
  assetSize: number;
};

export const useCanvasSize = ({ mapWidth, mapHeight, assetSize }: Params) => {
  const height = useMemo(
    () => (mapHeight * assetSize) / 2 + assetSize / 2,
    [mapHeight, assetSize],
  );
  const width = useMemo(() => mapWidth * assetSize, [mapWidth, assetSize]);

  return { height, width };
};
