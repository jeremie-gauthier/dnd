import { getAllPathsFromTileWithinRange } from "@dnd/shared";
import { useEffect } from "react";
import { TileClickedEvent } from "../../../../game-engine/events/tile-clicked.event";
import { Icon } from "../../../icon/Icon";
import { Button } from "../../../shared/button/Button";
import { useGameContext } from "../../context/GameContext/useGameContext";

export const MoveButton = () => {
  const {
    playerState,
    game,
    isPlaying,
    heroPlaying,
    gameEventManager,
    gameActions,
  } = useGameContext();

  if (!isPlaying || !heroPlaying) return null;

  const isMoving = playerState.currentAction === "move";
  const canMove =
    heroPlaying.characteristic.movementPoints > 0 &&
    heroPlaying.characteristic.actionPoints > 0;

  useEffect(() => {
    const handleClick: EventListener = async (e) => {
      if (!isMoving || !canMove) return;

      const { isometricCoord } = e as TileClickedEvent;

      const tilePaths = getAllPathsFromTileWithinRange({
        game,
        originCoord: heroPlaying.coord,
        maxRange: heroPlaying.characteristic.movementPoints,
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
    heroPlaying.characteristic.movementPoints,
    heroPlaying.coord,
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
