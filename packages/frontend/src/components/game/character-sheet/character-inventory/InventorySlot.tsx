import { useDroppable } from "@dnd-kit/core";
import { GameItem } from "@dnd/shared";
import { PropsWithChildren } from "react";
import { classNames } from "../../../../utils/class-names.util";

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
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
    data: { action: "swap_item", hostedItem, storageSpace },
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        "relative h-32 w-28 border-2 rounded flex flex-col items-center justify-center group",
        isOver ? "border-green-600" : slotTypeColor[type],
      )}
    >
      {children}
    </div>
  );
};

const slotTypeColor: Record<Props["type"], string> = {
  Spell: "border-blue-500",
  Weapon: "border-red-500",
  backpackAnyItem: "border-grey-500",
};
