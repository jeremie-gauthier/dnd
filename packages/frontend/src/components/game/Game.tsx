import {
  GameEntity,
  PlayerGamePhase,
  getAllPathsFromTileWithinRange,
  getCoordsFromTilePaths,
} from "@dnd/shared";
import { useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { Canvas } from "../canvas/canvas";
import { MoveButton } from "./action-bar/MoveButton";
import { useCanvasSize } from "./useCanvasSize";

type Props = {
  game: GameEntity;
  phase: PlayerGamePhase;
};

export const Game = ({ game, phase }: Props) => {
  const floorCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const entitiesCanvasRef = useRef<HTMLCanvasElement>(null);

  const { assetSize, renderPreviewLayer, clearPreviewLayer } = useGameEngine({
    floorCanvasRef,
    previewCanvasRef,
    entitiesCanvasRef,
    gameEntity: game,
    gamePhase: phase,
  });

  const { width, height } = useCanvasSize({
    mapWidth: game.map.width,
    mapHeight: game.map.height,
    assetSize,
  });

  const isPlaying = phase === "action";

  const handleMoveOn = () => {
    if (!isPlaying) return;

    const playableEntities = Object.values(game.playableEntities);
    const activeHero = playableEntities.find(
      (playableEntity) => playableEntity.currentPhase === "action",
    );
    if (!activeHero) return;
    const originCoord = activeHero.coord;

    const tilePaths = getAllPathsFromTileWithinRange({
      map: game.map,
      originCoord,
      maxRange: activeHero.movementPoints,
    });
    const coords = getCoordsFromTilePaths(tilePaths).filter(
      (coord) =>
        !(coord.column === originCoord.column && coord.row === originCoord.row),
    );

    renderPreviewLayer({ map: game.map, coords });
  };

  const handleMoveOff = () => {
    clearPreviewLayer();
  };

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
        <div className="flex flex-row">
          <MoveButton onClick={handleMoveOn} onCancel={handleMoveOff} />
        </div>
      ) : null}
    </div>
  );
};
