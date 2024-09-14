import { GameView, PlayableEntity, PlayerGamePhase, Tile } from "@dnd/shared";
import { createContext } from "react";
import { useGameActions } from "../../../../hooks/api/game/use-game-actions";
import { GameEventManager } from "../../game-engine/events";
import { usePlayerState } from "../../game-engine/state-machine";

type GameContextParams = {
  canvasRef: {
    floor: React.RefObject<HTMLCanvasElement>;
    preview: React.RefObject<HTMLCanvasElement>;
    entities: React.RefObject<HTMLCanvasElement>;
  };
  assetSize: number;
  gameEventManager: GameEventManager;
  game: GameView;
  playerState: ReturnType<typeof usePlayerState>;
  gameActions: ReturnType<typeof useGameActions>;
  phase: PlayerGamePhase;
  neighbourTiles: Tile[] | undefined;
  isPlaying: boolean;
  entityPlaying: PlayableEntity | undefined;
};

export const GameContext = createContext<GameContextParams>({
  game: {},
  phase: "idle",
  gameActions: {},
} as GameContextParams);
