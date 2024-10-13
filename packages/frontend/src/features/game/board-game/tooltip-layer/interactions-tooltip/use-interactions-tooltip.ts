import { useGameContext } from "@features/game/context/use-game-context";
import {
  Interaction,
  InteractionsAuthorizedEvent,
} from "@features/game/game-engine/events/interactions-authorized.event";
import { TileReleasedEvent } from "@features/game/game-engine/events/tile-released.event";
import { useEffect, useState } from "react";

export const useInteractionsTooltip = () => {
  const { gameEventManager, game, assetSize } = useGameContext();
  const size = Math.max(game.map.width, game.map.height);
  const halfAssetSize = assetSize / 2;
  const translateX = size * halfAssetSize - halfAssetSize;

  const [interactionsAuthorizedTooltip, setInteractionsAuthorizedTooltip] =
    useState<{
      radiusRing: number;
      x: number;
      y: number;
      interactions: Array<
        Interaction & { radius: number; x: number; y: number }
      >;
    } | null>(null);

  useEffect(() => {
    const handleInteractionsAuthorizedEvent: EventListener = (e) => {
      const { isometricCoord, interactions } = e as InteractionsAuthorizedEvent;
      const RADIUS_RING = assetSize * 1.75;

      setInteractionsAuthorizedTooltip({
        radiusRing: RADIUS_RING,
        x: isometricCoord.column + translateX + halfAssetSize,
        y: isometricCoord.row + halfAssetSize / 2,
        interactions: interactions.map((interaction, idx) => {
          const angle = (idx / (interactions.length / 2)) * Math.PI;
          const x =
            RADIUS_RING * Math.cos(angle) +
            isometricCoord.column +
            translateX +
            halfAssetSize;
          const y =
            RADIUS_RING * Math.sin(angle) +
            isometricCoord.row +
            halfAssetSize / 2;
          const radius = assetSize / 2;

          return { ...interaction, radius, x, y };
        }),
      });
    };
    gameEventManager.addEventListener(
      InteractionsAuthorizedEvent.EventName,
      handleInteractionsAuthorizedEvent,
    );

    const handleNoInteractionEvent = () => {
      setInteractionsAuthorizedTooltip(null);
    };
    gameEventManager.addEventListener(
      TileReleasedEvent.EventName,
      handleNoInteractionEvent,
    );

    return () => {
      gameEventManager.removeEventListener(
        InteractionsAuthorizedEvent.EventName,
        handleInteractionsAuthorizedEvent,
      );
      gameEventManager.removeEventListener(
        TileReleasedEvent.EventName,
        handleNoInteractionEvent,
      );
    };
  }, [
    assetSize,
    translateX,
    halfAssetSize,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
  ]);

  return { interactionsAuthorizedTooltip };
};
