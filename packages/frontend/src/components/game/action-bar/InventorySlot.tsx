import { GameItem } from "@dnd/shared";
import { PropsWithChildren } from "react";
import { classNames } from "../../../utils/class-names.util";

type Props = PropsWithChildren<{
  type: GameItem["type"] | "backpackAnyItem";
}>;

export const InventorySlot = ({ type, children }: Props) => {
  return (
    <div
      className={classNames(
        "relative h-32 w-28 border-2 rounded flex flex-col items-center justify-center group",
        slotTypeColor[type],
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
