import { Button } from "../shared/button/Button";
import { useGameContext } from "./context/useGameContext";

export const EndTurnButton = () => {
  const { playerState, heroPlaying, gameActions } = useGameContext();

  const handleClick = () => {
    playerState.toggleTo("idle");
    gameActions.endTurn();
  };

  if (!heroPlaying) {
    return null;
  }

  const hasActionPointsLeft = heroPlaying.characteristic.actionPoints > 0;

  return (
    <Button
      variant={hasActionPointsLeft ? "outlined" : "primary"}
      onClick={handleClick}
    >
      <span className="text-xl">End Turn</span>
    </Button>
  );
};
