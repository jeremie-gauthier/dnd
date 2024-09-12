import { Button } from "../shared/button/Button";
import { useGameContext } from "./context/GameContext/useGameContext";

export const EndTurnButton = () => {
  const { game, playerState, entityPlaying, gameActions } = useGameContext();

  const handleClick = () => {
    playerState.toggleTo("idle");
    gameActions.endTurn({ gameId: game.id });
  };

  if (!entityPlaying) {
    return null;
  }

  const hasActionPointsLeft = entityPlaying.characteristic.actionPoints > 0;

  return (
    <Button
      variant={hasActionPointsLeft ? "outlined" : "primary"}
      onClick={handleClick}
    >
      <span className="text-xl">End Turn</span>
    </Button>
  );
};
