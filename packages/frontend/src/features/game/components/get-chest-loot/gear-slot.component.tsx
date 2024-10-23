import { Icon } from "@/components/icon/Icon";
import { GameItem } from "@dnd/shared";
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
      key={idx}
      type={type}
      droppableId={`droppable-gear-slot-${idx}`}
      storageSpace="gear"
      hostedItem={item}
    >
      {item ? (
        <InventoryItem item={item} />
      ) : (
        <Icon icon="hand" className="fill-slate-500 h-28 w-28" />
      )}
    </InventorySlot>
  );
};
