import {
  Coord,
  coordToIndex,
  GameView,
  getAllPathsFromTileWithinRange,
  getNeighbourCoords,
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
import { getAllCoordsFromTilePaths } from "./move-utils";

export const useMove = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isPlaying,
  playerState,
  renderMovePreview,
  renderMoveForbiddenTooltip,
  clearTooltipLayer,
}: {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isPlaying: boolean;
  playerState: ReturnType<typeof usePlayerState>;
  renderMovePreview: ReturnType<typeof useMapRenderer>["renderMovePreview"];
  renderMoveForbiddenTooltip: ReturnType<
    typeof useMapRenderer
  >["renderMoveForbiddenTooltip"];
  clearTooltipLayer: ReturnType<typeof useMapRenderer>["clearTooltipLayer"];
}) => {
  const isMoving = isPlaying && playerState.currentAction === "move";
  const canMove =
    isPlaying &&
    entityPlaying &&
    entityPlaying.characteristic.movementPoints > 0 &&
    entityPlaying.characteristic.actionPoints > 0;
  const [tilePathCoords, setTilePathCoords] = useState<Coord[]>([]);
  const [availableTilesToMoveOn, setAvailableTilesToMoveOn] = useState<Coord[]>(
    [],
  );
  const [tilePaths, setTilePaths] = useState<TilePath[]>([]);

  useEffect(() => {
    if (!entityPlaying) return;

    const originCoord = entityPlaying.coord;
    const isLiddaMoving = entityPlaying.name.toLowerCase() === "lidda";
    const pathsFromTile = getAllPathsFromTileWithinRange({
      ally: isLiddaMoving ? "ignoring" : entityPlaying.faction,
      gameBoard: game.map,
      originCoord,
      maxRange: entityPlaying.characteristic.movementPoints,
    });
    const moveLimitCoords = getAllCoordsFromTilePaths(pathsFromTile).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );

    setTilePaths(pathsFromTile);
    setAvailableTilesToMoveOn(moveLimitCoords);
  }, [game.map, entityPlaying]);

  useEffect(() => {
    if (!canMove) return;

    const handleMouseDown: EventListener = (e) => {
      setTilePathCoords([entityPlaying.coord]);

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

    gameEventManager.addEventListener(
      TilePressedEvent.EventName,
      handleMouseDown,
    );

    return () => {
      gameEventManager.removeEventListener(
        TilePressedEvent.EventName,
        handleMouseDown,
      );
    };
  }, [
    canMove,
    entityPlaying,
    game,
    playerState,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: stable fns
  useEffect(() => {
    if (!isMoving) return;

    const handleMouseMove: EventListener = (e) => {
      if (!entityPlaying) return;

      const { isometricCoord } = e as TileHoveredEvent;

      // if it's a non accessible coord
      const isHoveredCoordAccessibleForEntityPlaying =
        availableTilesToMoveOn.some(
          ({ row, column }) =>
            row === isometricCoord.row && column === isometricCoord.column,
        );
      if (!isHoveredCoordAccessibleForEntityPlaying) {
        setTilePathCoords((coords) => coords.slice(0, 1));
        return;
      }

      // if it's a coord that has already been hovered
      const hoveredCoordTilePathIdx = tilePathCoords.findIndex(
        ({ row, column }) =>
          row === isometricCoord.row && column === isometricCoord.column,
      );
      const isHoveredCoordAlreadyInTilePath = hoveredCoordTilePathIdx >= 0;
      if (isHoveredCoordAlreadyInTilePath) {
        setTilePathCoords((coords) => [
          ...coords.slice(0, hoveredCoordTilePathIdx + 1),
        ]);
        return;
      }

      // if it's in entity move range
      const lastCoordHovered = tilePathCoords[tilePathCoords.length - 1];
      const lastCoordHoveredNeighbours = getNeighbourCoords({
        coord: lastCoordHovered,
      });
      const isInMoveRange =
        tilePathCoords.length <= entityPlaying.characteristic.movementPoints;
      if (isInMoveRange) {
        // if it's a new coord adjacent to the last one
        const isHoveredCoordAdjacentToLastOne = lastCoordHoveredNeighbours.some(
          ({ row, column }) =>
            row === isometricCoord.row && column === isometricCoord.column,
        );
        if (isHoveredCoordAdjacentToLastOne) {
          setTilePathCoords((coords) => [...coords, isometricCoord]);
          return;
        }
      }

      // if it's a new coord non-adjacent to the last one
      const selectedPath = tilePaths.find(
        ({ tile }) =>
          tile.coord.row === isometricCoord.row &&
          tile.coord.column === isometricCoord.column,
      );
      const newTilePathCoords = getAllCoordsFromTilePaths(
        selectedPath ? [selectedPath] : [],
      );
      setTilePathCoords(() => newTilePathCoords);
    };

    gameEventManager.addEventListener(
      TileHoveredEvent.EventName,
      handleMouseMove,
    );

    return () => {
      gameEventManager.removeEventListener(
        TileHoveredEvent.EventName,
        handleMouseMove,
      );
    };
  }, [
    tilePathCoords,
    isMoving,
    entityPlaying,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: stable game.id
  useEffect(() => {
    if (!canMove || !isMoving) return;

    const handleMouseUp: EventListener = (e) => {
      const { isometricCoord } = e as TileReleasedEvent;

      playerState.toggleTo("idle");
      clearTooltipLayer();

      const tilePathCoordsToMoveOn = tilePathCoords.slice(1);
      const canCommitMove = tilePathCoordsToMoveOn.some(
        ({ row, column }) =>
          row === isometricCoord.row && column === isometricCoord.column,
      );
      if (canCommitMove) {
        gameActions.move({
          gameId: game.id,
          pathToTile: tilePathCoordsToMoveOn,
        });
      }
    };

    gameEventManager.addEventListener(
      TileReleasedEvent.EventName,
      handleMouseUp,
    );

    return () => {
      gameEventManager.removeEventListener(
        TileReleasedEvent.EventName,
        handleMouseUp,
      );
    };
  }, [
    tilePathCoords,
    isMoving,
    canMove,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    clearTooltipLayer,
    playerState.toggleTo,
    gameActions.move,
  ]);

  useEffect(() => {
    if (!entityPlaying || !isMoving) return;

    const moveSimulationCoords = tilePathCoords.slice(1);

    renderMovePreview({
      map: game.map,
      moveLimitCoords: availableTilesToMoveOn,
      moveSimulationCoords,
    });

    const coordHovered = tilePathCoords[tilePathCoords.length - 1];
    if (!coordHovered) return;

    const isPlayingEntityPosition =
      coordHovered.column === entityPlaying.coord.column &&
      coordHovered.row === entityPlaying.coord.row;
    const tileIdx = coordToIndex({
      coord: coordHovered,
      metadata: { width: game.map.width, height: game.map.height },
    });
    const tile = game.map.tiles[tileIdx];
    if (!tile) return;

    const isAccessible = tile.entities.every((entity) => !entity.isBlocking);
    if (!isAccessible && !isPlayingEntityPosition) {
      renderMoveForbiddenTooltip({ map: game.map, coord2D: coordHovered });
    } else {
      clearTooltipLayer();
    }
  }, [
    isMoving,
    game.map,
    entityPlaying,
    tilePathCoords,
    availableTilesToMoveOn,
    renderMovePreview,
    renderMoveForbiddenTooltip,
    clearTooltipLayer,
  ]);
};
