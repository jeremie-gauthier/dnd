import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
import { InventorySlot } from "./InventorySlot";
import { InventoryItem } from "./actions/InventoryItem";

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
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <InventorySlot key={idx} type={type}>
          {item ? <InventoryItem item={item} /> : null}
        </InventorySlot>
      ))}
    </>
  );
};
