import { GameEntity } from "@dnd/shared";
import { useRef } from "react";
import { useGameEngine } from "../../game-engine";
import { Canvas } from "../canvas/canvas";
import { useCanvasSize } from "./useCanvasSize";

type Props = {
  game: GameEntity;
};

export const Game = ({ game }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { assetSize } = useGameEngine(ref, game);

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
