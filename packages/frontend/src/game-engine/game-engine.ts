import { GameEntity } from "@dnd/shared";
import { RefObject, useEffect } from "react";
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

  return {};
};
