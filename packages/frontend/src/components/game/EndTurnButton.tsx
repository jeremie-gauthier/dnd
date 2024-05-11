import { PauseCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../shared/button/Button";
import { useGameContext } from "./context/useGameContext";

export const EndTurnButton = () => {
  const { playerState, gameActions } = useGameContext();

  const handleClick = () => {
    playerState.toggleTo("idle");
    gameActions.endTurn();
  };

  return (
    <Button variant="outlined" onClick={handleClick}>
      <div className="flex items-center">
        <PauseCircleIcon className="h-5 w-5 text-orange-500" />
        <span>End Turn</span>
      </div>
    </Button>
  );
};
