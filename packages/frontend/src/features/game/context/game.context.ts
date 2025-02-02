import { CurrentPhase, GameResponseDto, Tile } from "@/openapi/dnd-api";
import { GameLog } from "@dnd/shared";
import { createContext } from "react";
import { GameEventManager } from "../game-engine/events";
import { usePlayerState } from "../game-engine/state-machine";
import { PlayableEntity } from "../interfaces/dnd-api/playable-entity.interface";
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
  game: GameResponseDto;
  playerState: ReturnType<typeof usePlayerState>;
  gameActions: ReturnType<typeof useGameActions>;
  phase: CurrentPhase;
  neighbourTiles: Tile[] | undefined;
  isPlaying: boolean;
  entityPlaying: PlayableEntity | undefined;
};

export const GameContext = createContext<GameContextParams>({
  game: {},
  phase: CurrentPhase.idle,
  gameActions: {},
} as GameContextParams);
