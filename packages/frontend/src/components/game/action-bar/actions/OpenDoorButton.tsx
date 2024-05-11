import { LockOpenIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../shared/button/Button";
import { useGameContext } from "../../context/useGameContext";

export const OpenDoorButton = () => {
  const { neighbourTiles, heroPlaying, playerState, gameActions, game } =
    useGameContext();

  const neighbourDoorCoord = neighbourTiles?.find((tile) =>
    tile.entities.some(
      (entity) =>
        entity.type === "non-playable-interactive-entity" &&
        entity.kind === "door" &&
        entity.isBlocking &&
        entity.canInteract,
    ),
  )?.coord;

  const canOpenDoor =
    neighbourDoorCoord !== undefined &&
    heroPlaying !== undefined &&
    heroPlaying.characteristic.actionPoints > 0;

  const handleClick = () => {
    if (!canOpenDoor) return;

    playerState.toggleTo("idle");
    gameActions.openDoor({
      gameId: game.id,
      coordOfTileWithDoor: neighbourDoorCoord,
    });
  };

  return (
    <Button variant="outlined" onClick={handleClick} disabled={!canOpenDoor}>
      <div className="flex items-center">
        <LockOpenIcon className="h-5 w-5 text-yellow-400" />
        <span>Open the door</span>
      </div>
    </Button>
  );
};
