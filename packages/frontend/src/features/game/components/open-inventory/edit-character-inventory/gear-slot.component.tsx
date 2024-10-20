import { GameItem } from "@dnd/shared";
import { Icon } from "@features/ui/icon/Icon";
import { InventoryItem } from "./common/inventory-item.component";
import { InventorySlot } from "./common/inventory-slot.component";

type Props = {
  item?: GameItem;
  type: "Weapon" | "Spell" | "Artifact";
  idx: number;
};

export const GearSlot = ({ item, type, idx }: Props) => {
  return (
    <InventorySlot
      type={type}
      droppableId={`droppable-gear-slot-${idx}`}
      storageSpace="gear"
      hostedItem={item}
    >
      {item ? (
        <InventoryItem item={item} storageSpace="gear" />
      ) : (
        <Icon icon="hand" className="fill-slate-500 h-28 w-28" />
      )}
    </InventorySlot>
  );
};
