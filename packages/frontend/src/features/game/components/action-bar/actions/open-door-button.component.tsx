import { useGameContext } from "@features/game/context/game.context";
import { Button } from "@features/ui/button/button";
import { Icon } from "@features/ui/icon/Icon";

export const OpenDoorButton = () => {
  const { neighbourTiles, entityPlaying, playerState, gameActions, game } =
    useGameContext();

  const neighbourDoorCoord = neighbourTiles?.find((tile) =>
    tile.entities.some(
      (entity) =>
        entity.type === "interactive-entity" &&
        entity.kind === "door" &&
        entity.isBlocking &&
        entity.canInteract,
    ),
  )?.coord;

  const canOpenDoor =
    neighbourDoorCoord !== undefined &&
    entityPlaying !== undefined &&
    entityPlaying.characteristic.actionPoints > 0;

  const handleClick = () => {
    if (!canOpenDoor) return;

    playerState.toggleTo("idle");
    gameActions.openDoor({
      gameId: game.id,
      coordOfTileWithDoor: neighbourDoorCoord,
    });
  };

  return (
    <Button variant="primary" onClick={handleClick} disabled={!canOpenDoor}>
      <Icon icon="openGate" className="fill-white h-10 w-10" />
    </Button>
  );
};
