import { StuffStorageCapacityResponseDto } from "@/openapi/dnd-api";
import { BackpackItem } from "@features/game/interfaces/dnd-api/item.interface";
import React from "react";

type Props = {
  backpack: BackpackItem[];
  storageCapacity: StuffStorageCapacityResponseDto;
  renderBackpackSlot: React.FC<{
    item?: BackpackItem;
    type: BackpackItem["type"] | "backpackAnyItem";
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
    type: item.type as BackpackItem["type"],
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
