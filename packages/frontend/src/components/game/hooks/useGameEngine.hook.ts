import { GameEntity } from "@dnd/shared";
import { RefObject } from "react";
import { useMapRenderer } from "../../../game-engine";

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement>,
  options: {
    gameData: GameEntity;
    height: number;
    width: number;
  },
) => {
  const mapRenderer = useMapRenderer(canvasRef);

  mapRenderer.render(options.gameData.map);

  return {
    tileSize: mapRenderer.options.tileSize,
    setTileSize: mapRenderer.options.setTileSize,
  };
};
