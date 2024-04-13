import type { GameEntity, PlayerGamePhase } from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { useMouseInputs } from ".";
import { useMapRenderer } from "./renderer";

export const useGameEngine = ({
  floorCanvasRef,
  previewCanvasRef,
  entitiesCanvasRef,
  gameEntity,
  gamePhase,
}: {
  floorCanvasRef: RefObject<HTMLCanvasElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  entitiesCanvasRef: RefObject<HTMLCanvasElement>;
  gameEntity: GameEntity;
  gamePhase: PlayerGamePhase;
}) => {
  const { render, renderPreviewLayer, clearPreviewLayer, assetSize } =
    useMapRenderer({
      floorCanvasRef,
      previewCanvasRef,
      entitiesCanvasRef,
    });

  const { addClickEvent, clearMouseEvents } = useMouseInputs(
    entitiesCanvasRef,
    {
      assetSize,
      map: {
        height: gameEntity.map.height * assetSize,
        width: gameEntity.map.width * assetSize,
      },
    },
  );

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities, gamePhase);
  }, [gameEntity.map, gameEntity.playableEntities, gamePhase, render]);

  useEffect(() => {
    if (!entitiesCanvasRef.current) return;

    addClickEvent();

    return clearMouseEvents;
  }, [entitiesCanvasRef.current, addClickEvent, clearMouseEvents]);

  return {
    assetSize,
    renderPreviewLayer,
    clearPreviewLayer,
  };
};
