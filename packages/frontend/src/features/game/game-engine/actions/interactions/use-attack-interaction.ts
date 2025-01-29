import { GameResponseDto, ItemType, TileEntityType } from "@/openapi/dnd-api";
import {
  PlayableEntity,
  TilePlayableEntity,
  coordToIndex,
  getLineOfSight,
  getNeighbourCoords,
} from "@dnd/shared";
import { useGameActions } from "@features/game/context/use-game-actions";
import { useEffect } from "react";
import { GameEventManager } from "../../events";
import { TilePressedEvent } from "../../events/tile-pressed.event";
import { TileReleasedEvent } from "../../events/tile-released.event";
import { useMapRenderer } from "../../renderer";
import { usePlayerState } from "../../state-machine";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameResponseDto;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isIdle: boolean;
  playerState: ReturnType<typeof usePlayerState>;
  renderAttackPreview: ReturnType<typeof useMapRenderer>["renderAttackPreview"];
  clearPreviewLayer: ReturnType<typeof useMapRenderer>["clearPreviewLayer"];
};

export const useAttackInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isIdle,
  playerState,
  renderAttackPreview,
  clearPreviewLayer,
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

      const metadata = { width: game.board.width, height: game.board.height };
      const tileIdx = coordToIndex({ coord: coord2D, metadata });
      const tilePressed = game.board.tiles[tileIdx];
      if (!tilePressed) {
        return;
      }

      const tilePlayableEntityTargeted = tilePressed.entities.find(
        (entity): entity is TilePlayableEntity =>
          entity.isBlocking &&
          entity.type === TileEntityType.PLAYABLE_ENTITY &&
          entity.id !== entityPlaying.id,
      );
      if (!tilePlayableEntityTargeted) {
        return;
      }

      const assetSize = 64;
      const isometricCoord = translate2DToIsometricCoord(coord2D, {
        assetSize,
        // Beware of the offset, it may shift everything being computed here.
        // We really want to have the tiles next to the borders of the canvas.
        map: {
          height: game.board.height * assetSize,
          width: game.board.width * assetSize,
        },
      });

      const attacks = entityPlaying.inventory.gear
        .filter(
          (stuff) =>
            stuff.type === ItemType.Weapon || stuff.type === ItemType.Spell,
        )
        .flatMap((attackItem) => attackItem.attacks);

      const isAdjacent = getNeighbourCoords({
        coord: entityPlaying.coord,
      }).some(
        (coord) => coord.row === coord2D.row && coord.column === coord2D.column,
      );
      if (isAdjacent) {
        const meleeAttacks = attacks.filter(
          (attack) => attack.range === "melee" || attack.range === "versatile",
        );
        if (meleeAttacks.length === 0) {
          return;
        }

        gameEventManager.emitInteractionsAuthorized({
          isometricCoord,
          tile: tilePressed,
          interactions: meleeAttacks.map((meleeAttack) => ({
            attack: meleeAttack,
            name: "attack",
            onInteract: () => {
              playerState.toggleTo("idle");
              gameActions.attack({
                gameId: game.id,
                attackId: meleeAttack.id,
                targetPlayableEntityId: tilePlayableEntityTargeted.id,
              });
            },
          })),
        });
      } else {
        const rangeAttack = attacks.filter(
          (attack) => attack.range === "long" || attack.range === "versatile",
        );
        if (rangeAttack.length === 0) {
          return;
        }

        const lineOfSight = getLineOfSight({
          ally: entityPlaying.faction,
          gameBoard: game.board,
          originCoord: entityPlaying.coord,
          range: "long",
        });
        const isTargetInLineOfSight = lineOfSight.some(
          (tile) =>
            tile.coord.column === coord2D.column &&
            tile.coord.row === coord2D.row,
        );
        if (!isTargetInLineOfSight) {
          return;
        }

        gameEventManager.emitInteractionsAuthorized({
          isometricCoord,
          tile: tilePressed,
          interactions: rangeAttack.map((rangeAttack) => ({
            attack: rangeAttack,
            name: "attack",
            onInteract: () => {
              playerState.toggleTo("idle");
              gameActions.attack({
                gameId: game.id,
                attackId: rangeAttack.id,
                targetPlayableEntityId: tilePlayableEntityTargeted.id,
              });
            },
          })),
        });
      }

      playerState.toggleTo("attack");
      renderAttackPreview({ map: game.board, coords: [coord2D] });
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
    entityPlaying,
    isIdle,
    renderAttackPreview,
    playerState.toggleTo,
    gameActions.attack,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    gameEventManager.emitInteractionsAuthorized,
  ]);

  useEffect(() => {
    const handleTileReleased = () => {
      if (playerState.currentAction === "attack") {
        playerState.toggleTo("idle");
        clearPreviewLayer();
      }
    };
    gameEventManager.addEventListener(
      TileReleasedEvent.EventName,
      handleTileReleased,
    );

    return () => {
      gameEventManager.removeEventListener(
        TileReleasedEvent.EventName,
        handleTileReleased,
      );
    };
  }, [
    clearPreviewLayer,
    playerState.currentAction,
    playerState.toggleTo,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
  ]);
};
