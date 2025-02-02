import {
  CurrentPhase,
  GameResponseDto,
  InteractiveEntityKind,
  TileEntityType,
} from "@/openapi/dnd-api";
import { PlayableEntity, coordToIndex, getNeighbourCoords } from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { useEffect } from "react";
import { GameEventManager } from "../../events";
import { TilePressedEvent } from "../../events/tile-pressed.event";
import { usePlayerState } from "../../state-machine";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameResponseDto;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isIdle: boolean;
  playerState: ReturnType<typeof usePlayerState>;
};

export const useOpenDoorInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isIdle,
  playerState,
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

      const isPressingADoor = tilePressed.entities.some(
        (entity) =>
          entity.type === TileEntityType.INTERACTIVE_ENTITY &&
          entity.kind === InteractiveEntityKind.door &&
          entity.canInteract,
      );
      if (!isPressingADoor) {
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
            name: "openDoor",
            onInteract: () => {
              playerState.toggleTo(CurrentPhase.idle);
              gameActions.openDoor({
                gameId: game.id,
                coordOfTileWithDoor: coord2D,
              });
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
    playerState.toggleTo,
    gameActions.openDoor,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    gameEventManager.emitInteractionsAuthorized,
  ]);
};
