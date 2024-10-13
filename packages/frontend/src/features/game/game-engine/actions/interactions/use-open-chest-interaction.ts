import {
  GameView,
  PlayableEntity,
  coordToIndex,
  getNeighbourCoords,
} from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { useEffect } from "react";
import { GameEventManager } from "../../events";
import { TilePressedEvent } from "../../events/tile-pressed.event";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isIdle: boolean;
};

export const useOpenChestInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isIdle,
}: Params) => {
  useEffect(() => {
    const handleTilePressed: EventListener = (e) => {
      const { coord2D } = e as TilePressedEvent;

      if (
        !isIdle ||
        !entityPlaying ||
        entityPlaying.characteristic.actionPoints <= 0
      ) {
        return;
      }

      const isAdjacent = getNeighbourCoords({
        coord: entityPlaying.coord,
      }).some(
        (coord) => coord.row === coord2D.row && coord.column === coord2D.column,
      );
      if (!isAdjacent) {
        return;
      }

      const metadata = { width: game.map.width, height: game.map.height };
      const tileIdx = coordToIndex({ coord: coord2D, metadata });
      const tilePressed = game.map.tiles[tileIdx];
      if (!tilePressed) {
        return;
      }

      const isPressingAChest = tilePressed.entities.some(
        (entity) =>
          entity.type === "interactive-entity" &&
          entity.kind === "chest" &&
          entity.canInteract,
      );
      if (!isPressingAChest) {
        return;
      }

      const assetSize = 64;
      const isometricCoordTranslated = translate2DToIsometricCoord(coord2D, {
        assetSize,
        // Beware of the offset, it may shift everything being computed here.
        // We really want to have the tiles next to the borders of the canvas.
        map: {
          height: game.map.height * assetSize,
          width: game.map.width * assetSize,
        },
      });
      gameEventManager.emitInteractionsAuthorized({
        isometricCoord: isometricCoordTranslated,
        tile: tilePressed,
        interactions: [
          {
            name: "openChest",
            onInteract: async () => {
              const openChestResult = await gameActions.openChest({
                gameId: game.id,
                coordOfTileWithChest: coord2D,
              });

              if (openChestResult.itemFound.type !== "ChestTrap") {
                gameEventManager.emitItemFound({
                  itemFound: openChestResult.itemFound,
                });
              }
            },
          },
        ],
      });
    };
    gameEventManager.addEventListener(
      TilePressedEvent.EventName,
      handleTilePressed,
    );

    return () => {
      gameEventManager.removeEventListener(
        TilePressedEvent.EventName,
        handleTilePressed,
      );
    };
  }, [
    game,
    isIdle,
    entityPlaying,
    gameActions.openChest,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    gameEventManager.emitInteractionsAuthorized,
    gameEventManager.emitItemFound,
  ]);
};
