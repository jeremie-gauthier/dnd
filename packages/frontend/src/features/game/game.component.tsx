import { BoardGame } from "./board-game/board-game.component";
import { ActionsLog } from "./components/action-log/action-log-list.component";
import { ActionPoints } from "./components/characteristics/action-points.component";
import { HealthPoints } from "./components/characteristics/health-points.component";
import { ManaPoints } from "./components/characteristics/mana-points.component";
import { MovementPoints } from "./components/characteristics/movement-points.component";
import { ConsumableList } from "./components/consumables/consumable-list.component";
import { EndTurnButton } from "./components/end-turn-button/end-turn-button.component";
import { GetChestLoot } from "./components/get-chest-loot/get-chest-loot.component";
import { OpenInventoryButton } from "./components/open-inventory/open-inventory-button.component";
import { useGameContext } from "./context/use-game-context";
import { Timeline } from "./timeline/timeline.component";

export const Game = () => {
  const { game, isPlaying, entityPlaying } = useGameContext();

  const consumables = entityPlaying?.inventory.backpack.filter(
    (item) => item.type === "Potion",
  );

  return (
    <>
      <div className="flex flex-col w-full gap-2 bg-support-gray-900">
        <p className="flex justify-start text-xs italic text-white">
          Game ID: {game.id}
        </p>

        <div className="relative flex flex-col p-4 gap-4">
          <div className="flex justify-center">
            {consumables && consumables.length > 0 && (
              <ConsumableList items={consumables} />
            )}
            <BoardGame />
          </div>

          <div className="flex flex-row justify-between">
            <ActionsLog />

            {isPlaying && entityPlaying ? (
              <div className="flex flex-row items-end gap-2">
                <HealthPoints
                  healthPoints={entityPlaying.characteristic.healthPoints}
                  baseHealthPoints={
                    entityPlaying.characteristic.baseHealthPoints
                  }
                />
                {entityPlaying.characteristic.baseManaPoints > 0 ? (
                  <ManaPoints
                    manaPoints={entityPlaying.characteristic.manaPoints}
                    baseManaPoints={entityPlaying.characteristic.baseManaPoints}
                  />
                ) : null}
                <ActionPoints
                  actionPoints={entityPlaying.characteristic.actionPoints}
                />
                <MovementPoints
                  movementPoints={entityPlaying.characteristic.movementPoints}
                />

                {entityPlaying.faction === "hero" ? (
                  <div className="flex flex-col justify-between">
                    <OpenInventoryButton />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-col items-end justify-end gap-4">
              <EndTurnButton />
              <div className="flex flex-row max-w-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-primary-900">
                <Timeline game={game} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetChestLoot />
    </>
  );
};
