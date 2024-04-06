import type { GameEntity, PlayerGamePhase } from "@dnd/shared";
import { useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { Canvas } from "../canvas/canvas";
import { useCanvasSize } from "./useCanvasSize";

type Props = {
  game: GameEntity;
  phase: PlayerGamePhase;
};

export const Game = ({ game, phase }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { assetSize } = useGameEngine({
    canvasRef: ref,
    gameEntity: game,
    gamePhase: phase,
  });

  const { width, height } = useCanvasSize({
    mapWidth: game.map.width,
    mapHeight: game.map.height,
    assetSize,
  });

  return (
    <div className="flex items-center w-full">
      <p>Game ID: {game.id}</p>
      <Canvas ref={ref} height={height} width={width} />
    </div>
  );
};
