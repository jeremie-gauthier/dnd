import {
  ItemType,
  SpellResponseDto,
  StuffStorageCapacityResponseDto,
  WeaponResponseDto,
} from "@/openapi/dnd-api";
import { GearItem } from "@features/game/interfaces/dnd-api/item.interface";
import { Fragment } from "react";

type Props = {
  gear: GearItem[];
  storageCapacity: StuffStorageCapacityResponseDto;
  renderGearSlot: React.FC<{
    item?: GearItem;
    type: GearItem["type"];
    idx: number;
  }>;
};

export const GearInventory = ({
  gear,
  storageCapacity,
  renderGearSlot,
}: Props) => {
  const gearWeapons = gear
    .filter((item) => item.type === ItemType.Weapon)
    .map<{ item: WeaponResponseDto; type: WeaponResponseDto["type"] }>(
      (item) => ({
        item,
        type: ItemType.Weapon,
      }),
    );
  const gearSpell = gear
    .filter((item) => item.type === ItemType.Spell)
    .map<{ item: SpellResponseDto; type: SpellResponseDto["type"] }>(
      (item) => ({
        item,
        type: ItemType.Spell,
      }),
    );

  const gearInventorySlots = [
    ...gearWeapons,
    ...Array.from<{ item: undefined; type: WeaponResponseDto["type"] }>({
      length: storageCapacity.nbWeaponSlots - gearWeapons.length,
    }).fill({ item: undefined, type: ItemType.Weapon }),
    ...gearSpell,
    ...Array.from<{ item: undefined; type: SpellResponseDto["type"] }>({
      length: storageCapacity.nbSpellSlots - gearSpell.length,
    }).fill({ item: undefined, type: ItemType.Spell }),
  ];

  return gearInventorySlots.map(({ item, type }, idx) => (
    // biome-ignore lint/suspicious/noArrayIndexKey:
    <Fragment key={idx}>{renderGearSlot({ item, type, idx })}</Fragment>
  ));
};
