import {
  getAllPathsFromTileWithinRange,
  getCoordsFromTilePaths,
  type GameEntity,
  type PlayerGamePhase,
} from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { GameEventManager } from "./events";
import { useMouseInputs } from "./inputs";
import { useMapRenderer } from "./renderer";
import { usePlayerState } from "./state-machine";

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
  const gameEventManager = GameEventManager.getInstance();

  const playerState = usePlayerState({
    playerPhase: gamePhase,
  });

  const { render, renderMovePreview, clearPreviewLayer, assetSize } =
    useMapRenderer({
      gameEventManager,
      floorCanvasRef,
      previewCanvasRef,
      entitiesCanvasRef,
    });

  const { addTileClickEvent, addHoverEvent, clearMouseEvents } = useMouseInputs(
    {
      canvasRef: entitiesCanvasRef,
      canvasConfig: {
        assetSize,
        map: {
          height: gameEntity.map.height * assetSize,
          width: gameEntity.map.width * assetSize,
        },
      },
      mapMetadata: {
        height: gameEntity.map.height,
        width: gameEntity.map.width,
      },
      gameEventManager,
    },
  );

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities, gamePhase);
  }, [gameEntity.map, gameEntity.playableEntities, gamePhase, render]);

  useEffect(() => {
    if (!entitiesCanvasRef.current) return;

    addTileClickEvent();
    addHoverEvent();

    return clearMouseEvents;
  }, [
    entitiesCanvasRef.current,
    addTileClickEvent,
    addHoverEvent,
    clearMouseEvents,
  ]);

  useEffect(() => {
    if (playerState.currentAction !== "move") {
      return;
    }

    const playableEntities = Object.values(gameEntity.playableEntities);
    const activeHero = playableEntities.find(
      (playableEntity) => playableEntity.currentPhase === "action",
    );
    if (!activeHero) return;
    const originCoord = activeHero.coord;

    const tilePaths = getAllPathsFromTileWithinRange({
      game: gameEntity,
      originCoord,
      maxRange: activeHero.characteristic.movementPoints,
    });
    const coords = getCoordsFromTilePaths(tilePaths).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );

    renderMovePreview({ map: gameEntity.map, coords });
  }, [playerState.currentAction, gameEntity, renderMovePreview]);

  useEffect(() => {
    if (playerState.currentAction !== "attack") {
      return;
    }
  }, [playerState.currentAction]);

  useEffect(() => {
    if (playerState.currentAction !== "idle") {
      return;
    }

    clearPreviewLayer();
  }, [playerState.currentAction, clearPreviewLayer]);

  return {
    assetSize,
    gameEventManager,
    playerState,
  };
};
