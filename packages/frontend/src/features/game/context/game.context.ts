import {
  GameLog,
  GameView,
  PlayableEntity,
  PlayerGamePhase,
  Tile,
} from "@dnd/shared";
import { createContext } from "react";
import { GameEventManager } from "../game-engine/events";
import { usePlayerState } from "../game-engine/state-machine";
import { useGameActions } from "./use-game-actions";

type GameContextParams = {
  actionsLogs: GameLog[];
  canvasRef: {
    floor: React.RefObject<HTMLCanvasElement>;
    preview: React.RefObject<HTMLCanvasElement>;
    entities: React.RefObject<HTMLCanvasElement>;
    tooltips: React.RefObject<SVGSVGElement>;
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
