import {
  ClientToServerEvents,
  GameEntity,
  PlayerGamePhase,
  coordToIndex,
  getAllPathsFromTileWithinRange,
  getNeighbourCoords,
} from "@dnd/shared";
import { useEffect, useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { TileClickedEvent } from "../../game-engine/events/tile-clicked.event";
import { Canvas } from "../canvas/canvas";
import { EndTurnButton } from "./action-bar/EndTurnButton";
import { MoveButton } from "./action-bar/MoveButton";
import { OpenDoorButton } from "./action-bar/OpenDoorButton";
import { useCanvasSize } from "./useCanvasSize";

type Props = {
  game: GameEntity;
  phase: PlayerGamePhase;
  actionHandlers: {
    move: ClientToServerEvents["client.game.player_requests_playable_entity_moves"];
    endTurn: ClientToServerEvents["client.game.player_requests_playable_entity_turn_ends"];
    openDoor: ClientToServerEvents["client.game.player_requests_playable_entity_open_door"];
  };
};

export const Game = ({ game, phase, actionHandlers }: Props) => {
  const floorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);

  const isPlaying = phase === "action";

  const heroPlaying = Object.values(game.playableEntities).find(
    ({ currentPhase }) => currentPhase === "action",
  );

  const { assetSize, gameEventManager, playerState } = useGameEngine({
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
    gameEntity: game,
    gamePhase: phase,
  });

  useEffect(() => {
    const handleClick: EventListener = async (e) => {
      if (playerState.currentAction !== "move" || !heroPlaying || !isPlaying)
        return;

      const { isometricCoord } = e as TileClickedEvent;

      const tilePaths = getAllPathsFromTileWithinRange({
        map: game.map,
        originCoord: heroPlaying.coord,
        maxRange: heroPlaying.movementPoints,
      });
      const selectedPath = tilePaths.find(
        ({ tile }) =>
          tile.coord.row === isometricCoord.row &&
          tile.coord.column === isometricCoord.column,
      );
      if (!selectedPath) return;

      actionHandlers.move({
        gameId: game.id,
        pathToTile: selectedPath,
        playableEntityId: heroPlaying.id,
      });

      playerState.toggleTo("idle");
    };

    gameEventManager.addEventListener("TileClicked", handleClick);

    return () =>
      gameEventManager.removeEventListener("TileClicked", handleClick);
  }, [
    gameEventManager,
    playerState.currentAction,
    playerState.toggleTo,
    game.map,
    game.id,
    heroPlaying,
    actionHandlers,
    isPlaying,
  ]);

  const { width, height } = useCanvasSize({
    mapWidth: game.map.width,
    mapHeight: game.map.height,
    assetSize,
  });

  const neighbourCoords =
    isPlaying && heroPlaying
      ? getNeighbourCoords({ coord: heroPlaying.coord })
      : undefined;
  const neighbourTiles = neighbourCoords
    ?.map((coord) => {
      const tileIdx = coordToIndex({
        coord,
        metadata: { width: game.map.width, height: game.map.height },
      });
      return game.map.tiles[tileIdx];
    })
    .filter((tile) => tile !== undefined);

  const neighbourDoorCoord = neighbourTiles?.find((tile) =>
    tile.entities.some(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "door" &&
        entity.isBlocking &&
        entity.canInteract,
    ),
  )?.coord;

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <p>Game ID: {game.id}</p>
      <div className="relative" style={{ height, width }}>
        <Canvas
          ref={floorCanvasRef}
          height={height}
          width={width}
          className="absolute z-0"
        />
        <Canvas
          ref={previewCanvasRef}
          height={height}
          width={width}
          className="absolute z-10"
        />
        <Canvas
          ref={entitiesCanvasRef}
          height={height}
          width={width}
          className="absolute z-20"
        />
      </div>
      {isPlaying ? (
        <>
          <div>
            <p>Status bar</p>
            <p>Hero turn: {heroPlaying?.name}</p>
            <p>
              Hero current coord: {JSON.stringify(heroPlaying?.coord ?? "{}")}
            </p>
            <p>Movement points: {heroPlaying?.movementPoints}</p>
            <p>Health points: {heroPlaying?.healthPoints}</p>
          </div>

          <div className="flex flex-row gap-2">
            <MoveButton
              isMoving={playerState.currentAction === "move"}
              onClick={() => playerState.toggleTo("move")}
              onCancel={() => playerState.toggleTo("idle")}
            />
            <OpenDoorButton
              onClick={() => {
                if (!neighbourDoorCoord) return;

                playerState.toggleTo("idle");
                actionHandlers.openDoor({
                  gameId: game.id,
                  coordOfTileWithDoor: neighbourDoorCoord,
                });
              }}
              disabled={!neighbourDoorCoord}
            />
            <EndTurnButton
              onClick={() => {
                playerState.toggleTo("idle");
                actionHandlers.endTurn();
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
