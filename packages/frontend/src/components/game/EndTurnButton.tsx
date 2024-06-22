import { Button } from "../shared/button/Button";
import { useGameContext } from "./context/GameContext/useGameContext";

export const EndTurnButton = () => {
  const { game, playerState, heroPlaying, gameActions } = useGameContext();

  const handleClick = () => {
    playerState.toggleTo("idle");
    gameActions.endTurn({ gameId: game.id });
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
