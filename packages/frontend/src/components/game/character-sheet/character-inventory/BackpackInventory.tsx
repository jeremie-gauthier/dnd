import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
import { InventoryItem } from "./InventoryItem";
import { InventorySlot } from "./InventorySlot";

type Props = {
  backpack: GameItem[];
  storageCapacity: StuffStorageCapacityJson;
};

export const BackpackInventory = ({ backpack, storageCapacity }: Props) => {
  const backpackItems = backpack.map((item) => ({
    item,
    type: item.type,
  }));

  const backpackInventorySlots = [
    ...backpackItems,
    ...Array.from<{ item: undefined; type: "backpackAnyItem" }>({
      length: storageCapacity.nbBackpackSlots - backpackItems.length,
    }).fill({ item: undefined, type: "backpackAnyItem" }),
  ];

  return (
    <>
      {backpackInventorySlots.map(({ item, type }, idx) => (
        <InventorySlot
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          type={type}
          droppableId={`droppable-backpack-slot-${idx}`}
          storageSpace="backpack"
        >
          {item ? <InventoryItem item={item} /> : null}
        </InventorySlot>
      ))}
    </>
  );
};
