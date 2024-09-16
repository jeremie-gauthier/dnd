import {
  coordToIndex,
  GameView,
  getAllPathsFromTileWithinRange,
  getCoordsFromTilePaths,
  PlayableEntity,
  TilePath,
} from "@dnd/shared";
import { useEffect, useState } from "react";
import { TileClickedEvent } from "../events/tile-clicked.event";
import { TilePressedEvent } from "../events/tile-pressed.event";
import { TileReleasedEvent } from "../events/tile-released.event";
import { useMapRenderer } from "../renderer";
import { usePlayerState } from "../state-machine";
import { GameEventManager, TileHoveredEvent } from "../events";
import { useGameActions } from "@features/game/context/use-game-actions";

export const useMove = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isPlaying,
  playerState,
  renderMovePreview,
}: {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isPlaying: boolean;
  playerState: ReturnType<typeof usePlayerState>;
  renderMovePreview: ReturnType<typeof useMapRenderer>["renderMovePreview"];
}) => {
  const isMoving = isPlaying && playerState.currentAction === "move";
  const canMove =
    isPlaying &&
    entityPlaying &&
    entityPlaying.characteristic.movementPoints > 0 &&
    entityPlaying.characteristic.actionPoints > 0;
  const [tilePath, setTilePath] = useState<TilePath | null>(null);

  useEffect(() => {
    const handleMouseDown: EventListener = async (e) => {
      if (!canMove) return;

      setTilePath(null);

      const { isometricCoord } = e as TileClickedEvent;
      const idx = coordToIndex({
        coord: isometricCoord,
        metadata: { height: game.map.height, width: game.map.width },
      });
      const tile = game.map.tiles[idx];
      if (!tile) return;

      const isTileWithEntityPlaying = tile.entities.some(
        (entity) =>
          entity.type === "playable-entity" && entity.id === entityPlaying.id,
      );
      if (isTileWithEntityPlaying) {
        playerState.toggleTo("move");
      }
    };

    const handleMouseMove: EventListener = async (e) => {
      if (!entityPlaying || !isMoving) return;

      const { isometricCoord } = e as TileClickedEvent;

      const isLiddaMoving = entityPlaying.name.toLowerCase() === "lidda";
      const tilePaths = getAllPathsFromTileWithinRange({
        ally: isLiddaMoving ? "ignoring" : entityPlaying.faction,
        gameBoard: game.map,
        originCoord: entityPlaying.coord,
        maxRange: entityPlaying.characteristic.movementPoints,
      });
      const selectedPath = tilePaths.find(
        ({ tile }) =>
          tile.coord.row === isometricCoord.row &&
          tile.coord.column === isometricCoord.column,
      );

      setTilePath(selectedPath ?? null);
    };

    const handleMouseUp: EventListener = async (e) => {
      if (!canMove || !isMoving) return;

      playerState.toggleTo("idle");

      if (tilePath) {
        gameActions.move({
          gameId: game.id,
          pathToTile: tilePath,
        });
      }
    };

    gameEventManager.addEventListener(
      TilePressedEvent.EventName,
      handleMouseDown,
    );
    gameEventManager.addEventListener(
      TileHoveredEvent.EventName,
      handleMouseMove,
    );
    gameEventManager.addEventListener(
      TileReleasedEvent.EventName,
      handleMouseUp,
    );

    return () => {
      gameEventManager.removeEventListener(
        TileClickedEvent.EventName,
        handleMouseDown,
      );
      gameEventManager.removeEventListener(
        TileHoveredEvent.EventName,
        handleMouseMove,
      );
      gameEventManager.removeEventListener(
        TileReleasedEvent.EventName,
        handleMouseUp,
      );
    };
  }, [
    isMoving,
    canMove,
    tilePath,
    game,
    gameActions.move,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    entityPlaying,
    playerState.toggleTo,
  ]);

  useEffect(() => {
    if (!entityPlaying || !isMoving) return;

    const originCoord = entityPlaying.coord;

    const isLiddaMoving = entityPlaying.name.toLowerCase() === "lidda";
    const tilePaths = getAllPathsFromTileWithinRange({
      ally: isLiddaMoving ? "ignoring" : entityPlaying.faction,
      gameBoard: game.map,
      originCoord,
      maxRange: entityPlaying.characteristic.movementPoints,
    });
    const moveLimitCoords = getCoordsFromTilePaths(tilePaths).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );
    const moveSimulationCoords = getCoordsFromTilePaths(
      tilePath ? [tilePath] : [],
    ).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );

    renderMovePreview({ map: game.map, moveLimitCoords, moveSimulationCoords });
  }, [isMoving, game, entityPlaying, tilePath, renderMovePreview]);
};
