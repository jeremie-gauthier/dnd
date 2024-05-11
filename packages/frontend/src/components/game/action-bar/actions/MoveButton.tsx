import { getAllPathsFromTileWithinRange } from "@dnd/shared";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { TileClickedEvent } from "../../../../game-engine/events/tile-clicked.event";
import { Button } from "../../../shared/button/Button";
import { useGameContext } from "../../context/useGameContext";

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
        map: game.map,
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
        playableEntityId: heroPlaying.id,
      });

      playerState.toggleTo("idle");
    };

    gameEventManager.addEventListener("TileClicked", handleClick);

    return () =>
      gameEventManager.removeEventListener("TileClicked", handleClick);
  }, [
    isMoving,
    canMove,
    game.id,
    game.map,
    gameActions.move,
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    heroPlaying.id,
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
    <Button variant="outlined" onClick={handleClick} disabled={!canMove}>
      <div className="flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 text-green-500" />
        <span>{isMoving ? "Cancel Move" : "Move"}</span>
      </div>
    </Button>
  );
};
