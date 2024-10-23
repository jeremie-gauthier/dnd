import { PlayerGamePhase } from "@dnd/shared";
import { useState } from "react";

type Params = {
  playerPhase: PlayerGamePhase;
};

type PlayerAction = "move" | "idle" | "attack";

export const usePlayerState = ({ playerPhase }: Params) => {
  const canAct = playerPhase === "action";

  const [currentAction, setCurrentAction] = useState<PlayerAction>("idle");
  const toggleTo = (requestedAction: PlayerAction) => {
    if (canAct) {
      setCurrentAction(requestedAction);
    }
  };

  return { canAct, currentAction, toggleTo };
};
