import { GameItem } from "@dnd/shared";
import { Icon } from "@features/ui/icon/Icon";
import { InventoryItem } from "./common/inventory-item.component";
import { InventorySlot } from "./common/invnetory-slot.component";

type Props = {
  item?: GameItem;
  type: "Weapon" | "Spell" | "backpackAnyItem";
  idx: number;
};

export const BackpackSlot = ({ item, type, idx }: Props) => {
  return (
    <InventorySlot
      key={idx}
      type={type}
      droppableId={`droppable-backpack-slot-${idx}`}
      storageSpace="backpack"
      hostedItem={item}
    >
      {item ? (
        <InventoryItem item={item} storageSpace="backpack" />
      ) : (
        <Icon icon="knapsack" className="fill-primary-600 h-28 w-28" />
      )}
    </InventorySlot>
  );
};
