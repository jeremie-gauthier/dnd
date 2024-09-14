import { getAllPathsFromTileWithinRange } from "@dnd/shared";
import { Button, Icon } from "@features/ui";
import { useEffect } from "react";
import { useGameContext } from "../../context/GameContext/useGameContext";
import { TileClickedEvent } from "../../game-engine/events/tile-clicked.event";

export const MoveButton = () => {
  const {
    playerState,
    game,
    isPlaying,
    entityPlaying,
    gameEventManager,
    gameActions,
  } = useGameContext();

  if (!isPlaying || !entityPlaying) return null;

  const isMoving = playerState.currentAction === "move";
  const canMove =
    entityPlaying.characteristic.movementPoints > 0 &&
    entityPlaying.characteristic.actionPoints > 0;

  useEffect(() => {
    const handleClick: EventListener = async (e) => {
      if (!isMoving || !canMove) return;

      const { isometricCoord } = e as TileClickedEvent;

      const isLiddaMoving = entityPlaying.name.toLowerCase() === "lidda";
      const tilePaths = getAllPathsFromTileWithinRange({
        ally: isLiddaMoving ? "ignoring" : entityPlaying.faction,
        gameBoard: game.map,
        originCoord: entityPlaying.coord,
        maxRange: entityPlaying.characteristic.movementPoints,
      });
      const selectedPath = tilePaths.find(
        ({ tile }) =>
          tile.coord.row === isometricCoord.row &&
          tile.coord.column === isometricCoord.column,
      );
      if (!selectedPath) return;

      gameActions.move({
        gameId: game.id,
        pathToTile: selectedPath,
      });

      playerState.toggleTo("idle");
    };

    gameEventManager.addEventListener(TileClickedEvent.EventName, handleClick);

    return () =>
      gameEventManager.removeEventListener(
        TileClickedEvent.EventName,
        handleClick,
      );
  }, [
    isMoving,
    canMove,
    game,
    gameActions.move,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    entityPlaying.name,
    entityPlaying.faction,
    entityPlaying.characteristic.movementPoints,
    entityPlaying.coord,
    playerState.toggleTo,
  ]);

  const handleClick = () => {
    if (isMoving) {
      playerState.toggleTo("idle");
    } else {
      playerState.toggleTo("move");
    }
  };

  return (
    <Button
      variant={isMoving ? "outlined" : "primary"}
      onClick={handleClick}
      disabled={!canMove}
    >
      <Icon
        icon="walkingBoot"
        className={`${isMoving ? "fill-amber-800" : "fill-white"} h-10 w-10`}
      />
    </Button>
  );
};
