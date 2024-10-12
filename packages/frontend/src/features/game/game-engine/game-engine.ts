import { type GameView, type PlayerGamePhase } from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { useGameActions } from "../context/use-game-actions";
import { useInteraction } from "./actions/interactions/use-interaction";
import { useMove } from "./actions/use-move";
import { GameEventManager } from "./events";
import { useMouseInputs } from "./inputs";
import { useMapRenderer } from "./renderer";
import { usePlayerState } from "./state-machine";

export const useGameEngine = ({
  floorCanvasRef,
  previewCanvasRef,
  entitiesCanvasRef,
  tooltipsLayerRef,
  gameActions,
  gameEntity,
  gamePhase,
}: {
  floorCanvasRef: RefObject<HTMLCanvasElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  entitiesCanvasRef: RefObject<HTMLCanvasElement>;
  tooltipsLayerRef: RefObject<SVGSVGElement>;
  gameActions: ReturnType<typeof useGameActions>;
  gameEntity: GameView;
  gamePhase: PlayerGamePhase;
}) => {
  const entityPlaying = Object.values(gameEntity.playableEntities).find(
    ({ currentPhase }) => currentPhase === "action",
  );

  const gameEventManager = GameEventManager.getInstance();

  const playerState = usePlayerState({
    playerPhase: gamePhase,
  });

  const {
    render,
    renderMovePreview,
    renderPlayableEntityTurnHighlight,
    clearPreviewLayer,
    assetSize,
  } = useMapRenderer({
    gameEventManager,
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
  });

  const {
    addTileClickEvent,
    addTilePressedEvent,
    addTileReleasedEvent,
    addHoverEvent,
    clearMouseEvents,
  } = useMouseInputs({
    layerRef: tooltipsLayerRef,
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
  });

  useMove({
    entityPlaying,
    game: gameEntity,
    gameActions,
    gameEventManager,
    isPlaying: gamePhase === "action",
    playerState,
    renderMovePreview,
  });
  useInteraction({
    entityPlaying,
    game: gameEntity,
    gameActions,
    gameEventManager,
    isPlaying: gamePhase === "action",
    playerState,
  });

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities, gamePhase);
  }, [gameEntity.map, gameEntity.playableEntities, gamePhase, render]);

  useEffect(() => {
    if (!tooltipsLayerRef.current || !render) return;

    addTileClickEvent();
    addHoverEvent();
    addTilePressedEvent();
    addTileReleasedEvent();

    return clearMouseEvents;
  }, [
    tooltipsLayerRef.current,
    addTileClickEvent,
    addTilePressedEvent,
    addTileReleasedEvent,
    addHoverEvent,
    clearMouseEvents,
    render,
  ]);

  useEffect(() => {
    if (playerState.currentAction !== "idle") {
      return;
    }

    clearPreviewLayer();
    if (entityPlaying) {
      renderPlayableEntityTurnHighlight({
        map: gameEntity.map,
        playingEntityCoord: entityPlaying.coord,
      });
    }
  }, [
    playerState.currentAction,
    clearPreviewLayer,
    gameEntity.map,
    entityPlaying,
    renderPlayableEntityTurnHighlight,
  ]);

  return {
    assetSize,
    gameEventManager,
    playerState,
  };
};
