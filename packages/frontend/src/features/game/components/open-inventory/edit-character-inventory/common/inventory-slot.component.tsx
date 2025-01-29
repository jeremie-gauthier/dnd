import { useDroppable } from "@dnd-kit/core";
import { slotTypeColor } from "@features/game/components/utils";
import {
  BackpackItem,
  GearItem,
} from "@features/game/interfaces/dnd-api/item.interface";
import { cn } from "@lib/utils";
import { PropsWithChildren, useEffect } from "react";
import { useEditCharacterInventoryContext } from "../edit-character-inventory.context";

type Props = PropsWithChildren<{
  type: BackpackItem["type"] | "backpackAnyItem";
  droppableId: string;
  hostedItem?: GearItem | BackpackItem;
  storageSpace: "gear" | "backpack";
}>;

export const InventorySlot = ({
  type,
  children,
  droppableId,
  hostedItem,
  storageSpace,
}: Props) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: droppableId,
    data: { action: "swap_item", hostedItem, storageSpace, slotType: type },
  });

  const isDragging = active !== null;
  const isDraggingCompatibleItem =
    type === "backpackAnyItem" || active?.data.current?.item.type === type;
  const isDraggingItemFromSameStorageSpace =
    active?.data.current?.storageSpace === storageSpace;
  const isDraggingHostedItem =
    active?.data.current?.item.name === hostedItem?.name;

  const { setTooltipType } = useEditCharacterInventoryContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: setTooltipType is a react hook
  useEffect(() => {
    if (!isOver) return;

    if (hostedItem) {
      const isSwappable =
        isDraggingCompatibleItem && active?.data.current?.item !== hostedItem;
      setTooltipType(
        isSwappable && !isDraggingItemFromSameStorageSpace
          ? "confirm_swap"
          : null,
      );
    } else {
      setTooltipType(
        isDraggingCompatibleItem && !isDraggingItemFromSameStorageSpace
          ? "confirm_move"
          : null,
      );
    }
  }, [
    isDraggingCompatibleItem,
    hostedItem,
    isOver,
    active?.data.current?.item,
    isDraggingItemFromSameStorageSpace,
  ]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-32 w-28 border-2 rounded flex flex-col items-center justify-center group",
        isOver &&
          isDraggingCompatibleItem &&
          (!isDraggingItemFromSameStorageSpace || isDraggingHostedItem)
          ? "border-white"
          : slotTypeColor[type],
        isDragging && !isDraggingCompatibleItem ? "grayscale" : "",
        isDragging &&
          isDraggingItemFromSameStorageSpace &&
          !isDraggingHostedItem
          ? "grayscale"
          : "",
      )}
    >
      {children}
    </div>
  );
};
