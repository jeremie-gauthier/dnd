import { GameItem } from "@dnd/shared";
import { useGameContext } from "@features/game/context/use-game-context";
import { Button, Icon } from "@features/ui";
import { useState } from "react";
import { GetChestLoot } from "./get-chest-loot/get-chest-loot.component";

export const OpenChestButton = () => {
  const { neighbourTiles, entityPlaying, playerState, gameActions, game } =
    useGameContext();
  const [itemFoundInChest, setItemFoundInChest] = useState<GameItem | null>(
    null,
  );

  const closeLootMenu = () => {
    setItemFoundInChest(null);
  };

  const neighbourChestCoord = neighbourTiles?.find((tile) =>
    tile.entities.some(
      (entity) =>
        entity.type === "interactive-entity" &&
        entity.kind === "chest" &&
        entity.isBlocking &&
        entity.canInteract,
    ),
  )?.coord;

  const canOpenChest =
    neighbourChestCoord !== undefined &&
    entityPlaying !== undefined &&
    entityPlaying.characteristic.actionPoints > 0;

  const handleClick = async () => {
    if (!canOpenChest) return;

    playerState.toggleTo("idle");
    const openChestResult = await gameActions.openChest({
      gameId: game.id,
      coordOfTileWithChest: neighbourChestCoord,
    });

    setItemFoundInChest(openChestResult.itemFound);
  };

  return (
    <>
      <Button variant="primary" onClick={handleClick} disabled={!canOpenChest}>
        <Icon icon="openChest" className="fill-white h-10 w-10" />
      </Button>

      <GetChestLoot
        isOpen={itemFoundInChest !== null}
        close={closeLootMenu}
        itemFoundInChest={itemFoundInChest}
      />
    </>
  );
};
