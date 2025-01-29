import { PlayerStatus } from "@/openapi/dnd-api";
import { PlayerGamePhase } from "@dnd/shared";
import { useState } from "react";

type Params = {
  playerPhase: PlayerGamePhase;
};

export const usePlayerState = ({ playerPhase }: Params) => {
  const canAct = playerPhase === PlayerStatus.action;

  const [currentAction, setCurrentAction] = useState<PlayerStatus>(
    PlayerStatus.idle,
  );
  const toggleTo = (requestedAction: PlayerStatus) => {
    if (canAct) {
      setCurrentAction(requestedAction);
    }
  };

  return { canAct, currentAction, toggleTo };
};
