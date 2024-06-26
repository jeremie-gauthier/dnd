import { ActionPoints } from "./ActionPoints";
import { BoardGameCanvas } from "./BoardGameCanvas";
import { EndTurnButton } from "./EndTurnButton";
import { HealthPoints } from "./HealthPoints";
import { ManaPoints } from "./ManaPoints";
import { MovementPoints } from "./MovementPoints";
import { Timeline } from "./Timeline";
import { ActionBar } from "./action-bar/ActionBar";
import { useGameContext } from "./context/GameContext/useGameContext";

export const Game = () => {
  const { game, isPlaying, heroPlaying } = useGameContext();

  return (
    <div className="flex flex-col w-full gap-4">
      <p className="flex justify-start text-xs">Game ID: {game.id}</p>

      <div className="flex flex-col bg-black p-4 gap-4">
        <div className="flex justify-center">
          <BoardGameCanvas />
        </div>

        <div className="flex flex-row justify-end">
          <Timeline game={game} />
        </div>
      </div>

      <div className="flex flex-row justify-center w-full gap-16">
        {isPlaying && heroPlaying ? (
          <>
            <div className="flex flex-col items-center">
              <HealthPoints />
              <div className="flex flex-row gap-1">
                <ManaPoints />
                <ActionPoints />
                <MovementPoints />
              </div>
            </div>

            <ActionBar />

            <EndTurnButton />
          </>
        ) : null}
      </div>
    </div>
  );
};
