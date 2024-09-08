import { GameItem } from "@dnd/shared";
import { IconKnapsack } from "../../icon/icons/IconKnapsack";
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
        <IconKnapsack className="fill-primary-600" />
      )}
    </InventorySlot>
  );
};
