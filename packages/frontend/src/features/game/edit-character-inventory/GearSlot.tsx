import { GameItem } from "@dnd/shared";
import { IconHand } from "../../ui/icon/icons/IconHand";
import { InventoryItem } from "./common/InventoryItem";
import { InventorySlot } from "./common/InventorySlot";

type Props = {
  item?: GameItem;
  type: "Weapon" | "Spell" | "backpackAnyItem";
  idx: number;
};

export const GearSlot = ({ item, type, idx }: Props) => {
  return (
    <InventorySlot
      key={idx}
      type={type}
      droppableId={`droppable-gear-slot-${idx}`}
      storageSpace="gear"
      hostedItem={item}
    >
      {item ? (
        <InventoryItem item={item} storageSpace="gear" />
      ) : (
        <IconHand className="fill-primary-600" />
      )}
    </InventorySlot>
  );
};
