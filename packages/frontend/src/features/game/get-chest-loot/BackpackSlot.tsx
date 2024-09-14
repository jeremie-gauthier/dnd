import { GameItem } from "@dnd/shared";
import { Icon } from "@features/ui";
import { InventoryItem } from "./common/InventoryItem";
import { InventorySlot } from "./common/InventorySlot";

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
        <InventoryItem item={item} />
      ) : (
        <Icon icon="knapsack" className="fill-primary-600" />
      )}
    </InventorySlot>
  );
};
