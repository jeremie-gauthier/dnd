import { useGameContext } from "@features/game/context/use-game-context";
import { Button } from "@features/ui/button/button";
import { useTranslation } from "react-i18next";

export const EndTurnButton = () => {
  const { t } = useTranslation(["common"]);
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
      <span className="text-xl">{t("endTurn")}</span>
    </Button>
  );
};
