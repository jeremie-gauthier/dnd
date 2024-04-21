import {
  ClientToServerEvents,
  GameEntity,
  PlayerGamePhase,
  getAllPathsFromTileWithinRange,
} from "@dnd/shared";
import { useEffect, useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { TileClickedEvent } from "../../game-engine/events/tile-clicked.event";
import { Canvas } from "../canvas/canvas";
import { MoveButton } from "./action-bar/MoveButton";
import { useCanvasSize } from "./useCanvasSize";

type Props = {
  game: GameEntity;
  phase: PlayerGamePhase;
  actionHandlers: {
    move: ClientToServerEvents["client.game.player_requests_playable_entity_moves"];
  };
};

export const Game = ({ game, phase, actionHandlers }: Props) => {
  const floorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);

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
      if (playerState.currentAction !== "move" || !heroPlaying) return;

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
  ]);

  const { width, height } = useCanvasSize({
    mapWidth: game.map.width,
    mapHeight: game.map.height,
    assetSize,
  });

  const isPlaying = phase === "action";

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

          <div className="flex flex-row">
            <MoveButton
              isMoving={playerState.currentAction === "move"}
              onClick={() => playerState.toggleTo("move")}
              onCancel={() => playerState.toggleTo("idle")}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
