import {
  CoordResponseDto,
  CurrentPhase,
  GameResponseDto,
  TileEntityType,
} from "@/openapi/dnd-api";
import {
  TilePath,
  coordToIndex,
  getAllPathsFromTileWithinRange,
  getNeighbourCoords,
} from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import { useEffect, useState } from "react";
import { GameEventManager, TileHoveredEvent } from "../events";
import { TileClickedEvent } from "../events/tile-clicked.event";
import { TilePressedEvent } from "../events/tile-pressed.event";
import { TileReleasedEvent } from "../events/tile-released.event";
import { useMapRenderer } from "../renderer";
import { usePlayerState } from "../state-machine";
import { translate2DToIsometricCoord } from "../utils/coords-conversion.util";
import { getAllCoordsFromTilePaths } from "./move-utils";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameResponseDto;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isPlaying: boolean;
  playerState: ReturnType<typeof usePlayerState>;
  renderMovePreview: ReturnType<typeof useMapRenderer>["renderMovePreview"];
};

export const useMove = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isPlaying,
  playerState,
  renderMovePreview,
}: Params) => {
  const isMoving = isPlaying && playerState.currentAction === "move";
  const canMove =
    isPlaying &&
    entityPlaying &&
    entityPlaying.characteristic.movementPoints > 0 &&
    entityPlaying.characteristic.actionPoints > 0;
  const [tilePathCoords, setTilePathCoords] = useState<CoordResponseDto[]>([]);
  const [availableTilesToMoveOn, setAvailableTilesToMoveOn] = useState<
    CoordResponseDto[]
  >([]);
  const [tilePaths, setTilePaths] = useState<TilePath[]>([]);

  useEffect(() => {
    if (!entityPlaying) return;

    const originCoord = entityPlaying.coord;
    const isLiddaMoving = entityPlaying.name.toLowerCase() === "lidda";
    const pathsFromTile = getAllPathsFromTileWithinRange({
      ally: isLiddaMoving ? "ignoring" : entityPlaying.faction,
      gameBoard: game.board,
      originCoord,
      maxRange: entityPlaying.characteristic.movementPoints,
    });
    const moveLimitCoords = getAllCoordsFromTilePaths(pathsFromTile).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );

    setTilePaths(pathsFromTile);
    setAvailableTilesToMoveOn(moveLimitCoords);
  }, [game.board, entityPlaying]);

  useEffect(() => {
    if (!canMove) return;

    const handleMouseDown: EventListener = (e) => {
      setTilePathCoords([entityPlaying.coord]);

      const { coord2D } = e as TileClickedEvent;
      const idx = coordToIndex({
        coord: coord2D,
        metadata: { height: game.board.height, width: game.board.width },
      });
      const tile = game.board.tiles[idx];
      if (!tile) return;

      const isTileWithEntityPlaying = tile.entities.some(
        (entity) =>
          entity.type === TileEntityType.PLAYABLE_ENTITY &&
          entity.id === entityPlaying.id,
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

      const { coord2D } = e as TileHoveredEvent;

      // if it's a non accessible coord
      const isHoveredCoordAccessibleForEntityPlaying =
        availableTilesToMoveOn.some(
          ({ row, column }) => row === coord2D.row && column === coord2D.column,
        );
      if (!isHoveredCoordAccessibleForEntityPlaying) {
        setTilePathCoords((coords) => coords.slice(0, 1));
        return;
      }

      // if it's a coord that has already been hovered
      const hoveredCoordTilePathIdx = tilePathCoords.findIndex(
        ({ row, column }) => row === coord2D.row && column === coord2D.column,
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
          ({ row, column }) => row === coord2D.row && column === coord2D.column,
        );
        if (isHoveredCoordAdjacentToLastOne) {
          setTilePathCoords((coords) => [...coords, coord2D]);
          return;
        }
      }

      // if it's a new coord non-adjacent to the last one
      const selectedPath = tilePaths.find(
        ({ tile }) =>
          tile.coord.row === coord2D.row &&
          tile.coord.column === coord2D.column,
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
      const { coord2D } = e as TileReleasedEvent;

      playerState.toggleTo(CurrentPhase.idle);

      const tilePathCoordsToMoveOn = tilePathCoords.slice(1);
      const canCommitMove = tilePathCoordsToMoveOn.some(
        ({ row, column }) => row === coord2D.row && column === coord2D.column,
      );
      if (canCommitMove) {
        gameActions.move({
          gameId: game.id,
          pathToTile: tilePathCoordsToMoveOn,
        });
      }

      const assetSize = 64;
      const isometricCoord = translate2DToIsometricCoord(coord2D, {
        assetSize,
        // Beware of the offset, it may shift everything being computed here.
        // We really want to have the tiles next to the borders of the canvas.
        map: {
          height: game.board.height * assetSize,
          width: game.board.width * assetSize,
        },
      });
      gameEventManager.emitMoveAuthorized({ isometricCoord });
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
    playerState.toggleTo,
    gameActions.move,
  ]);

  useEffect(() => {
    if (!entityPlaying || !isMoving) return;

    const moveSimulationCoords = tilePathCoords.slice(1);

    renderMovePreview({
      map: game.board,
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
      metadata: { width: game.board.width, height: game.board.height },
    });
    const tile = game.board.tiles[tileIdx];
    if (!tile) return;

    const assetSize = 64;
    const isometricCoord = translate2DToIsometricCoord(coordHovered, {
      assetSize,
      // Beware of the offset, it may shift everything being computed here.
      // We really want to have the tiles next to the borders of the canvas.
      map: {
        height: game.board.height * assetSize,
        width: game.board.width * assetSize,
      },
    });

    const isAccessible = tile.entities.every((entity) => !entity.isBlocking);
    if (!isAccessible && !isPlayingEntityPosition) {
      gameEventManager.emitMoveForbidden({ coordHovered, isometricCoord });
    } else {
      gameEventManager.emitMoveAuthorized({ isometricCoord });
    }
  }, [
    isMoving,
    game.board,
    entityPlaying,
    tilePathCoords,
    availableTilesToMoveOn,
    renderMovePreview,
    gameEventManager.emitMoveForbidden,
    gameEventManager.emitMoveAuthorized,
  ]);
};
