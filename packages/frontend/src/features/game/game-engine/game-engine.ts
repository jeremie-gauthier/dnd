import { type GameView, type PlayerGamePhase } from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { GameEventManager } from "./events";
import { useMouseInputs } from "./inputs";
import { useMapRenderer } from "./renderer";
import { usePlayerState } from "./state-machine";
import { useMove } from "./actions/use-move";
import { useGameActions } from "../context/use-game-actions";

export const useGameEngine = ({
  floorCanvasRef,
  previewCanvasRef,
  entitiesCanvasRef,
  gameActions,
  gameEntity,
  gamePhase,
}: {
  floorCanvasRef: RefObject<HTMLCanvasElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  entitiesCanvasRef: RefObject<HTMLCanvasElement>;
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

  const { render, renderMovePreview, clearPreviewLayer, assetSize } =
    useMapRenderer({
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

  useEffect(() => {
    if (!render) return;

    render(gameEntity.map, gameEntity.playableEntities, gamePhase);
  }, [gameEntity.map, gameEntity.playableEntities, gamePhase, render]);

  useEffect(() => {
    if (!entitiesCanvasRef.current) return;

    addTileClickEvent();
    addHoverEvent();
    addTilePressedEvent();
    addTileReleasedEvent();

    return clearMouseEvents;
  }, [
    entitiesCanvasRef.current,
    addTileClickEvent,
    addTilePressedEvent,
    addTileReleasedEvent,
    addHoverEvent,
    clearMouseEvents,
  ]);

  // useEffect(() => {
  //   if (playerState.currentAction !== "attack") {
  //     return;
  //   }
  // }, [playerState.currentAction]);

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
