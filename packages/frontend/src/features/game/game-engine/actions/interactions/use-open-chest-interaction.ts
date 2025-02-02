import { GameResponseDto, ItemType, TileEntityType } from "@/openapi/dnd-api";
import { coordToIndex, getNeighbourCoords } from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import { useEffect } from "react";
import { GameEventManager } from "../../events";
import { TilePressedEvent } from "../../events/tile-pressed.event";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameResponseDto;
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

      const metadata = { width: game.board.width, height: game.board.height };
      const tileIdx = coordToIndex({ coord: coord2D, metadata });
      const tilePressed = game.board.tiles[tileIdx];
      if (!tilePressed) {
        return;
      }

      const isPressingAChest = tilePressed.entities.some(
        (entity) =>
          entity.type === TileEntityType.INTERACTIVE_ENTITY &&
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
          height: game.board.height * assetSize,
          width: game.board.width * assetSize,
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

              if (openChestResult.itemFound.type !== ItemType.ChestTrap) {
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
