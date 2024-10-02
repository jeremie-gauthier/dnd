import { BoardGameCanvas } from "./board-game/board-game.component";
import { ActionBar } from "./components/action-bar/action-bar";
import { ActionPoints } from "./components/characteristics/action-points.component";
import { HealthPoints } from "./components/characteristics/health-points.component";
import { ManaPoints } from "./components/characteristics/mana-points.component";
import { MovementPoints } from "./components/characteristics/movement-points.component";
import { ConsumableList } from "./components/consumables/consumable-list.component";
import { useGameContext } from "./context/use-game-context";
import { Timeline } from "./timeline/timeline.component";

export const Game = () => {
  const { game, isPlaying, entityPlaying } = useGameContext();

  const consumables = entityPlaying?.inventory.backpack.filter(
    (item) => item.type === "Potion",
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <p className="flex justify-start text-xs">Game ID: {game.id}</p>

      <div className="flex flex-col bg-black p-4 gap-4">
        <div className="flex justify-center">
          {consumables && consumables.length > 0 && (
            <ConsumableList items={consumables} />
          )}
          <BoardGameCanvas />
        </div>

        <div className="flex flex-row justify-end">
          <Timeline game={game} />
        </div>
      </div>

      <div className="flex flex-row justify-center w-full gap-16">
        {isPlaying && entityPlaying ? (
          <>
            <div className="flex flex-col items-center">
              <HealthPoints
                healthPoints={entityPlaying.characteristic.healthPoints}
                baseHealthPoints={entityPlaying.characteristic.baseHealthPoints}
                size="large"
              />
              <div className="flex flex-row gap-1">
                <ManaPoints
                  manaPoints={entityPlaying.characteristic.manaPoints}
                  baseManaPoints={entityPlaying.characteristic.baseManaPoints}
                />
                <ActionPoints
                  actionPoints={entityPlaying.characteristic.actionPoints}
                />
                <MovementPoints
                  movementPoints={entityPlaying.characteristic.movementPoints}
                />
              </div>
            </div>

            <ActionBar />
          </>
        ) : null}
      </div>
    </div>
  );
};
