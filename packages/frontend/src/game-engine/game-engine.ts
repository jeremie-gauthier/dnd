import type { GameEntity } from "@dnd/shared";
import { type RefObject, useEffect } from "react";
import { useMouseInputs } from ".";
import { useMapRenderer } from "./renderer";

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gameEntity: GameEntity,
) => {
  const mapRenderer = useMapRenderer(canvasRef);

  const { addClickEvent, clearMouseEvents } = useMouseInputs(canvasRef);

  useEffect(() => {
    if (!mapRenderer.render) return;

    mapRenderer.render(gameEntity.map);
  }, [gameEntity.map, mapRenderer.render]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the canvasRef change
  useEffect(() => {
    if (!canvasRef.current) return;

    addClickEvent();

    return clearMouseEvents;
  }, [canvasRef.current]);

  return {
    assetSize: 64,
  };
};
