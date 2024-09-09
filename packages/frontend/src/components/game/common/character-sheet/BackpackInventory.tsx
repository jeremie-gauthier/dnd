import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
import React from "react";

type Props = {
  backpack: GameItem[];
  storageCapacity: StuffStorageCapacityJson;
  renderBackpackSlot: React.FC<{
    item?: GameItem;
    type: "Weapon" | "Spell" | "backpackAnyItem";
    idx: number;
  }>;
};

export const BackpackInventory = ({
  backpack,
  storageCapacity,
  renderBackpackSlot,
}: Props) => {
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

  return backpackInventorySlots.map(({ item, type }, idx) =>
    renderBackpackSlot({ item, type, idx }),
  );
};
