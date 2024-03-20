import type { GameEntity } from "@dnd/shared";
import { useEffect, type RefObject } from "react";
import { useMouseInputs } from ".";
import { useMapRenderer } from "./renderer";

export const useGameEngine = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gameEntity: GameEntity,
) => {
  const { render, assetSize } = useMapRenderer(canvasRef);

  const { addClickEvent, clearMouseEvents } = useMouseInputs(canvasRef, {
    assetSize,
    map: {
      height: gameEntity.map.height * assetSize,
      width: gameEntity.map.width * assetSize,
    },
  });

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities);
  }, [gameEntity.map, gameEntity.playableEntities, render]);

  useEffect(() => {
    if (!canvasRef.current) return;

    addClickEvent();

    return clearMouseEvents;
  }, [canvasRef.current, addClickEvent, clearMouseEvents]);

  return {
    assetSize,
  };
};
