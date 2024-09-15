import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";

type Props = {
  gear: GameItem[];
  storageCapacity: StuffStorageCapacityJson;
  renderGearSlot: React.FC<{
    item?: GameItem;
    type: "Weapon" | "Spell" | "backpackAnyItem";
    idx: number;
  }>;
};

export const GearInventory = ({
  gear,
  storageCapacity,
  renderGearSlot,
}: Props) => {
  const gearWeapons = gear
    .filter((item) => item.type === "Weapon")
    .map<{ item: GameItem; type: "Weapon" }>((item) => ({
      item,
      type: "Weapon",
    }));
  const gearSpell = gear
    .filter((item) => item.type === "Spell")
    .map<{ item: GameItem; type: "Spell" }>((item) => ({
      item,
      type: "Spell",
    }));

  const gearInventorySlots = [
    ...gearWeapons,
    ...Array.from<{ item: undefined; type: "Weapon" }>({
      length: storageCapacity.nbWeaponSlots - gearWeapons.length,
    }).fill({ item: undefined, type: "Weapon" }),
    ...gearSpell,
    ...Array.from<{ item: undefined; type: "Spell" }>({
      length: storageCapacity.nbSpellSlots - gearSpell.length,
    }).fill({ item: undefined, type: "Spell" }),
  ];

  return gearInventorySlots.map(({ item, type }, idx) =>
    renderGearSlot({ item, type, idx }),
  );
};