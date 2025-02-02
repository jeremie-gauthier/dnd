import { CurrentPhase } from "@/openapi/dnd-api";
import { PlayerGamePhase } from "@dnd/shared";
import { useState } from "react";

type Params = {
  playerPhase: PlayerGamePhase;
};

export const usePlayerState = ({ playerPhase }: Params) => {
  const canAct = playerPhase === CurrentPhase.action;

  const [currentAction, setCurrentAction] = useState<
    CurrentPhase | "attack" | "move"
  >(CurrentPhase.idle);
  const toggleTo = (requestedAction: CurrentPhase | "attack" | "move") => {
    if (canAct) {
      setCurrentAction(requestedAction);
    }
  };

  return { canAct, currentAction, toggleTo };
};
