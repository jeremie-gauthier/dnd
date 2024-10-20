import { GameItem } from "@dnd/shared";
import { useGameContext } from "@features/game/context/use-game-context";
import { ConsumableItem } from "./consumable-item.component";

type Props = {
  items: Array<Extract<GameItem, { type: "Potion" }>>;
};

export const ConsumableList = ({ items }: Props) => {
  const { game, gameActions } = useGameContext();

  const handleClick = (item: Props["items"][number]) => {
    console.log(item.name);
    gameActions.drinkPotion({ gameId: game.id, itemId: item.name });
  };

  return (
    <div className="fixed left-5 z-40 flex flex-col bg-slate-600 rounded p-2 h-fit max-w-20 gap-2">
      {items.map((item) => (
        <button key={item.name} type="button" onClick={() => handleClick(item)}>
          <div className="flex border-4 bg-slate-700 border-slate-700 rounded items-center shadow-md shadow-slate-900">
            <ConsumableItem item={item} />
          </div>
        </button>
      ))}
    </div>
  );
};
