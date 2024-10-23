import { Icon } from "@/components/icon/Icon";
import { GameItem } from "@dnd/shared";
import { InventoryItem } from "./common/inventory-item.component";
import { InventorySlot } from "./common/inventory-slot.component";

type Props = {
  item?: GameItem;
  type: "Weapon" | "Spell" | "Artifact" | "Potion" | "backpackAnyItem";
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
        <Icon icon="knapsack" className="fill-slate-500 h-28 w-28" />
      )}
    </InventorySlot>
  );
};
