import { Button } from "@/components/ui/button";
import { useGameContext } from "@features/game/context/use-game-context";
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

  return (
    <Button variant="outline" onClick={handleClick}>
      <span className="text-xl">{t("endTurn")}</span>
    </Button>
  );
};
