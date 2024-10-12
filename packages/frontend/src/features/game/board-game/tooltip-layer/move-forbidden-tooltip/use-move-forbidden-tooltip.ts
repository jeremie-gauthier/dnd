import { useGameContext } from "@features/game/context/use-game-context";
import { MoveAuthorizedEvent } from "@features/game/game-engine/events/move-authorized.event";
import { MoveForbiddenEvent } from "@features/game/game-engine/events/move-forbidden.event";
import { useEffect, useState } from "react";

export const useMoveForbiddenTooltip = () => {
  const { gameEventManager, game, assetSize } = useGameContext();
  const size = Math.max(game.map.width, game.map.height);
  const halfAssetSize = assetSize / 2;
  const translateX = size * halfAssetSize - halfAssetSize;

  const [moveForbiddenTooltip, setMoveForbiddenTooltip] = useState<{
    size: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const handleMoveForbiddenEvent: EventListener = (e) => {
      const { isometricCoord } = e as MoveForbiddenEvent;
      const tooltipSize = 24;
      const halfTooltipSize = tooltipSize / 2;
      setMoveForbiddenTooltip({
        size: tooltipSize,
        x: isometricCoord.column + translateX + halfAssetSize - halfTooltipSize,
        y: isometricCoord.row + halfAssetSize / 2 - halfTooltipSize,
      });
    };
    gameEventManager.addEventListener(
      MoveForbiddenEvent.EventName,
      handleMoveForbiddenEvent,
    );

    const handleMoveAuthorizedEvent = () => {
      setMoveForbiddenTooltip(null);
    };
    gameEventManager.addEventListener(
      MoveAuthorizedEvent.EventName,
      handleMoveAuthorizedEvent,
    );

    return () => {
      gameEventManager.removeEventListener(
        MoveForbiddenEvent.EventName,
        handleMoveForbiddenEvent,
      );
      gameEventManager.removeEventListener(
        MoveAuthorizedEvent.EventName,
        handleMoveForbiddenEvent,
      );
    };
  }, [
    translateX,
    halfAssetSize,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
  ]);

  return { moveForbiddenTooltip };
};
