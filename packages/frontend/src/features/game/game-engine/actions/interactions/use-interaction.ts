import { GameView, PlayableEntity } from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { GameEventManager } from "../../events";
import { useMapRenderer } from "../../renderer";
import { usePlayerState } from "../../state-machine";
import { useAttackInteraction } from "./use-attack-interaction";
import { useOpenChestInteraction } from "./use-open-chest-interaction";
import { useOpenDoorInteraction } from "./use-open-door-interaction";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isPlaying: boolean;
  playerState: ReturnType<typeof usePlayerState>;
  renderAttackPreview: ReturnType<typeof useMapRenderer>["renderAttackPreview"];
  clearPreviewLayer: ReturnType<typeof useMapRenderer>["clearPreviewLayer"];
};

export const useInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isPlaying,
  playerState,
  renderAttackPreview,
  clearPreviewLayer,
}: Params) => {
  const isIdle = isPlaying && playerState.currentAction === "idle";

  useOpenDoorInteraction({
    entityPlaying,
    game,
    gameActions,
    gameEventManager,
    isIdle,
    playerState,
  });
  useAttackInteraction({
    entityPlaying,
    game,
    gameActions,
    gameEventManager,
    isIdle,
    playerState,
    renderAttackPreview,
    clearPreviewLayer,
  });
  useOpenChestInteraction({
    entityPlaying,
    game,
    gameActions,
    gameEventManager,
    isIdle,
  });
};
