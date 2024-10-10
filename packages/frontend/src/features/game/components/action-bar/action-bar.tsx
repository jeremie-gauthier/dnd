import { GameItem } from "@dnd/shared";
import { useGameContext } from "../../context/use-game-context";
import { AttackItem } from "./actions/attack-item.component";
import { EndTurnButton } from "./actions/end-turn-button.component";
import { OpenChestButton } from "./actions/open-chest/open-chest-button.component";
import { OpenDoorButton } from "./actions/open-door-button.component";
import { InventorySlot } from "./actions/open-inventory/edit-character-inventory/common/inventory-slot.component";
import { OpenInventoryButton } from "./actions/open-inventory/open-inventory-button.component";
import { ActionBarContextProvider } from "./context/action-bar-context-provider";

export const ActionBar = () => {
  const { isPlaying, entityPlaying } = useGameContext();

  if (!isPlaying || !entityPlaying) return null;
  const { gear, storageCapacity } = entityPlaying.inventory;

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
    <ActionBarContextProvider>
      <div className="flex flex-row gap-2 h-32">
        {gearInventorySlots.map(({ item, type }, idx) => {
          if (!item || (item.type !== "Weapon" && item.type !== "Spell")) {
            return null;
          }

          return item.attacks.map((attack) => (
            // TODO: create new component for action bar only
            <InventorySlot
              key={`${item.name}-${attack.type}`}
              type={type}
              droppableId={`droppable-action-slot-${idx}`}
              storageSpace={"gear"}
              hostedItem={item}
            >
              <AttackItem
                key={`${item.name}-${attack.type}`}
                item={item}
                attack={attack}
              />
            </InventorySlot>
          ));
        })}

        <div className="flex flex-row justify-around gap-2">
          <div className="flex flex-col justify-between">
            <OpenDoorButton />
          </div>

          {entityPlaying.faction === "hero" ? (
            <div className="flex flex-col justify-between">
              <OpenInventoryButton />
              <OpenChestButton />
            </div>
          ) : null}
        </div>

        <EndTurnButton />
      </div>
    </ActionBarContextProvider>
  );
};
