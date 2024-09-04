import { useDroppable } from "@dnd-kit/core";
import { GameItem } from "@dnd/shared";
import { PropsWithChildren, useEffect } from "react";
import { classNames } from "../../../../../utils/class-names.util";
import { useCharacterSheetContext } from "../../CharacterSheetContext";

type Props = PropsWithChildren<{
  type: GameItem["type"] | "backpackAnyItem";
  droppableId: string;
  hostedItem?: GameItem;
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
    data: { action: "swap_item", hostedItem, storageSpace },
  });

  const isDragging = active !== null;
  const isDraggingCompatibleItem =
    type === "backpackAnyItem" || active?.data.current?.item.type === type;

  const { setTooltipType } = useCharacterSheetContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: setTooltipType is a react hook
  useEffect(() => {
    if (isOver) {
      if (hostedItem) {
        const isSwappable =
          isDraggingCompatibleItem && active?.data.current?.item !== hostedItem;
        setTooltipType(isSwappable ? "confirm_swap" : null);
      } else {
        setTooltipType("confirm_move");
      }
    } else {
      setTooltipType(null);
    }
  }, [
    isDraggingCompatibleItem,
    hostedItem,
    isOver,
    active?.data.current?.item,
  ]);

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        "relative h-32 w-28 border-2 rounded flex flex-col items-center justify-center group",
        isOver && isDraggingCompatibleItem
          ? "border-white"
          : slotTypeColor[type],
        isDragging && !isDraggingCompatibleItem ? "grayscale" : "",
      )}
    >
      {children}
    </div>
  );
};

const slotTypeColor: Record<Props["type"], string> = {
  Spell: "border-blue-500",
  Weapon: "border-red-500",
  backpackAnyItem: "border-primary-600",
};
