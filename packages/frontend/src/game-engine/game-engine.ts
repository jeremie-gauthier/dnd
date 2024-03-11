import { GameEntity } from "@dnd/shared";
import { RefObject, useEffect, useLayoutEffect } from "react";
import { useMouseInputs } from ".";
import { useMapRenderer } from "./renderer";

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement>,
  options: {
    gameData: GameEntity;
    height: number;
    width: number;
  },
) => {
  const mapRenderer = useMapRenderer(canvasRef);
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    mapRenderer.options.setTileSize(
      Math.max(canvasRef.current.height, canvasRef.current.width) /
        Math.max(options.gameData.map.height, options.gameData.map.width),
    );
  }, [
    mapRenderer.options.setTileSize,
    canvasRef.current,
    options.gameData.map.height,
    options.gameData.map.width,
  ]);

  const { addClickEvent, clearMouseEvents } = useMouseInputs(canvasRef);

  useEffect(() => {
    if (!mapRenderer.render) return;
    console.log(options.gameData.map);

    mapRenderer.render(options.gameData.map);
  }, [options.gameData.map, mapRenderer.render]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the canvasRef change
  useEffect(() => {
    if (!canvasRef.current) return;

    addClickEvent();

    return clearMouseEvents;
  }, [canvasRef.current]);

  return {
    tileSize: mapRenderer.options.tileSize,
    setTileSize: mapRenderer.options.setTileSize,
  };
};
