import { useState } from "react";

export const useMapRendererOptions = () => {
  const [tileSize, setTileSize] = useState(96);
  const [colors, _setColors] = useState({
    tactic: {
      tile: {
        background: {
          even: "#b5a370",
          odd: "#8f7f56",
        },
      },
    },
  });

  const handleSetTileSize = (newSize: number) => {
    if (newSize <= 0) {
      throw new Error("Tile size must be greater than zero");
    }
    // It's important to have int here to create nice continuity between tiles
    // on float numbers, lines of pixels appears between the tiles
    setTileSize(Math.floor(newSize));
  };

  return {
    tileSize,
    setTileSize: handleSetTileSize,
    colors,
  };
};
