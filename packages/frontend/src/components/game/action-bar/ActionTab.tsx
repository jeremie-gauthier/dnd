import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
import { ActionTabContextProvider } from "../context/ActionTab/ActionTabContextProvider";
import { InventorySlot } from "./InventorySlot";
import { AttackItem } from "./actions/AttackItem";
import { MoveButton } from "./actions/MoveButton";
import { OpenDoorButton } from "./actions/OpenDoorButton";

type Props = {
  gear: GameItem[];
  storageCapacity: StuffStorageCapacityJson;
};

export const ActionTab = ({ gear, storageCapacity }: Props) => {
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

  return (
    <ActionTabContextProvider>
      {gearInventorySlots.map(({ item, type }) =>
        item?.attacks.map((attack) => (
          <InventorySlot key={`${item.name}-${attack.type}`} type={type}>
            <AttackItem
              key={`${item.name}-${attack.type}`}
              item={item}
              attack={attack}
            />
          </InventorySlot>
        )),
      )}
      <div className="flex flex-col justify-around">
        <MoveButton />
        <OpenDoorButton />
      </div>
    </ActionTabContextProvider>
  );
};
