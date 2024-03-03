import { GameEntity } from "@dnd/shared";
import { useRef } from "react";
import { Canvas } from "../canvas/canvas";
import { useGameEngine } from "./hooks/useGameEngine.hook";

type Props = {
  game: GameEntity;
};

const HEIGHT = 1080;
const WIDTH = 1920;

export const Game = ({ game }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const gameEngine = useGameEngine(ref, {
    gameData: game,
    height: HEIGHT,
    width: WIDTH,
  });

  return (
    <div className="flex items-center w-full">
      <p>Game ID: {game.id}</p>
      <button
        type="button"
        onClick={() => gameEngine?.setTileSize(gameEngine.tileSize + 10)}
      >
        +10 size
      </button>
      <Canvas ref={ref} height={HEIGHT} width={WIDTH} />
    </div>
  );
};
