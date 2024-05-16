import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
import { InventorySlot } from "./InventorySlot";
import { InventoryItem } from "./actions/InventoryItem";

type Props = {
  gear: GameItem[];
  storageCapacity: StuffStorageCapacityJson;
};

export const GearInventory = ({ gear, storageCapacity }: Props) => {
  const gearWeapons = gear
    .filter((item) => item.type === "weapon")
    .map<{ item: GameItem; type: "weapon" }>((item) => ({
      item,
      type: "weapon",
    }));
  const gearSpell = gear
    .filter((item) => item.type === "spell")
    .map<{ item: GameItem; type: "spell" }>((item) => ({
      item,
      type: "spell",
    }));

  const gearInventorySlots = [
    ...gearWeapons,
    ...Array.from<{ item: undefined; type: "weapon" }>({
      length: storageCapacity.nbWeaponSlots - gearWeapons.length,
    }).fill({ item: undefined, type: "weapon" }),
    ...gearSpell,
    ...Array.from<{ item: undefined; type: "spell" }>({
      length: storageCapacity.nbSpellSlots - gearSpell.length,
    }).fill({ item: undefined, type: "spell" }),
  ];

  return (
    <>
      {gearInventorySlots.map(({ item, type }, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: no stable unique id exploitable
        <InventorySlot key={idx} type={type}>
          {item ? <InventoryItem item={item} /> : null}
        </InventorySlot>
      ))}
    </>
  );
};
