import { GameView, PlayableEntity } from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { GameEventManager } from "../../events";
import { usePlayerState } from "../../state-machine";
import { useOpenDoorInteraction } from "./use-open-door-interaction";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isPlaying: boolean;
  playerState: ReturnType<typeof usePlayerState>;
};

export const useInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isPlaying,
  playerState,
}: Params) => {
  const isIdle = isPlaying && playerState.currentAction === "idle";

  useOpenDoorInteraction({
    entityPlaying,
    game,
    gameActions,
    gameEventManager,
    isIdle,
  });
};
