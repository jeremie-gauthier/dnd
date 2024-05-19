import { Icon } from "../../../icon/Icon";
import { Button } from "../../../shared/button/Button";
import { useGameContext } from "../../context/GameContext/useGameContext";

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
    <Button variant="primary" onClick={handleClick} disabled={!canOpenDoor}>
      <Icon icon="openGate" className="fill-white h-10 w-10" />
    </Button>
  );
};
