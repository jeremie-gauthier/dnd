import {
  GameView,
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
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";

type Params = {
  entityPlaying?: PlayableEntity;
  game: GameView;
  gameActions: ReturnType<typeof useGameActions>;
  gameEventManager: GameEventManager;
  isIdle: boolean;
};

export const useAttackInteraction = ({
  entityPlaying,
  game,
  gameActions,
  gameEventManager,
  isIdle,
}: Params) => {
  useEffect(() => {
    const handleTilePressed: EventListener = (e) => {
      const { isometricCoord } = e as TilePressedEvent;

      if (!isIdle || !entityPlaying) {
        return;
      }

      const metadata = { width: game.map.width, height: game.map.height };
      const tileIdx = coordToIndex({ coord: isometricCoord, metadata });
      const tilePressed = game.map.tiles[tileIdx];
      if (!tilePressed) {
        return;
      }

      const tilePlayableEntityTargeted = tilePressed.entities.find(
        (entity): entity is TilePlayableEntity =>
          entity.isBlocking &&
          entity.type === "playable-entity" &&
          entity.id !== entityPlaying.id,
      );
      if (!tilePlayableEntityTargeted) {
        return;
      }

      const assetSize = 64;
      const isometricCoordTranslated = translate2DToIsometricCoord(
        isometricCoord,
        {
          assetSize,
          // Beware of the offset, it may shift everything being computed here.
          // We really want to have the tiles next to the borders of the canvas.
          map: {
            height: game.map.height * assetSize,
            width: game.map.width * assetSize,
          },
        },
      );

      const attacks = entityPlaying.inventory.gear
        .filter((stuff) => stuff.type === "Weapon" || stuff.type === "Spell")
        .flatMap((attackItem) => attackItem.attacks);

      const isAdjacent = getNeighbourCoords({
        coord: entityPlaying.coord,
      }).some(
        (coord) =>
          coord.row === isometricCoord.row &&
          coord.column === isometricCoord.column,
      );
      if (isAdjacent) {
        const meleeAttacks = attacks.filter(
          (attack) => attack.range === "melee" || attack.range === "versatile",
        );
        if (meleeAttacks.length === 0) {
          return;
        }

        gameEventManager.emitInteractionsAuthorized({
          isometricCoord: isometricCoordTranslated,
          tile: tilePressed,
          interactions: meleeAttacks.map((meleeAttack) => ({
            attack: meleeAttack,
            name: "attack",
            onInteract: () =>
              gameActions.attack({
                gameId: game.id,
                attackId: meleeAttack.id,
                targetPlayableEntityId: tilePlayableEntityTargeted.id,
              }),
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
          gameBoard: game.map,
          originCoord: entityPlaying.coord,
          range: "long",
        });
        const isTargetInLineOfSight = lineOfSight.some(
          (tile) =>
            tile.coord.column === isometricCoord.column &&
            tile.coord.row === isometricCoord.row,
        );
        if (!isTargetInLineOfSight) {
          return;
        }

        gameEventManager.emitInteractionsAuthorized({
          isometricCoord: isometricCoordTranslated,
          tile: tilePressed,
          interactions: rangeAttack.map((rangeAttack) => ({
            attack: rangeAttack,
            name: "attack",
            onInteract: () =>
              gameActions.attack({
                gameId: game.id,
                attackId: rangeAttack.id,
                targetPlayableEntityId: tilePlayableEntityTargeted.id,
              }),
          })),
        });
      }
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
    gameActions.attack,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    gameEventManager.emitInteractionsAuthorized,
  ]);
};
