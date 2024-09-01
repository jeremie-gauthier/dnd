import { GameItem, StuffStorageCapacityJson } from "@dnd/shared";
// TODO: create new component for InventorySlot
import { InventorySlot } from "../character-sheet/character-inventory/InventorySlot";
import { ActionTabContextProvider } from "../context/ActionTab/ActionTabContextProvider";
import { AttackItem } from "./actions/AttackItem";
import { MoveButton } from "./actions/MoveButton";
import { OpenDoorButton } from "./actions/OpenDoorButton";
import { OpenInventoryButton } from "./actions/OpenInventoryButton";

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
      <div className="flex flex-col items-center justify-between h-42 min-w-96">
        <div className="flex flex-row gap-2">
          {gearInventorySlots.map(({ item, type }, idx) =>
            item?.attacks.map((attack) => (
              // TODO: create new component for action bar only
              <InventorySlot
                key={`${item.name}-${attack.type}`}
                type={type}
                droppableId={`droppable-action-slot-${idx}`}
                storageSpace={"gear"}
              >
                <AttackItem
                  key={`${item.name}-${attack.type}`}
                  item={item}
                  attack={attack}
                />
              </InventorySlot>
            )),
          )}

          <div className="flex flex-row justify-around py-1 gap-2">
            <div className="flex flex-col justify-between">
              <MoveButton />
              <OpenDoorButton />
            </div>

            <div className="flex flex-col">
              <OpenInventoryButton />
            </div>
          </div>
        </div>
      </div>
    </ActionTabContextProvider>
  );
};
