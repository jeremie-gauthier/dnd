import type { GameEntity } from "@dnd/shared";
import { useEffect, type RefObject } from "react";
import { useMouseInputs } from ".";
import { useMapRenderer } from "./renderer";

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gameEntity: GameEntity,
) => {
  const { render, assetSize } = useMapRenderer(canvasRef);

  const { addClickEvent, clearMouseEvents } = useMouseInputs(canvasRef);

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities);
  }, [gameEntity.map, gameEntity.playableEntities, render]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the canvasRef change
  useEffect(() => {
    if (!canvasRef.current) return;

    addClickEvent();

    return clearMouseEvents;
  }, [canvasRef.current]);

  return {
    assetSize,
  };
};
