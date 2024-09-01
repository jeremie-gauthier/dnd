import { PlayableEntity } from "@dnd/shared";
import { BackpackInventory } from "../action-bar/BackpackInventory";
import { GearInventory } from "../action-bar/GearInventory";

type Props = {
  character: PlayableEntity;
};

export const CharacterInventory = ({ character }: Props) => {
  // TODO: add translations

  return (
    <>
      <div className="flex flex-col">
        <h4 className="text-white text-lg">Équipement</h4>
        <div className="flex flex-row gap-4">
          <GearInventory
            gear={character.inventory.gear}
            storageCapacity={character.inventory.storageCapacity}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-white text-lg">Sac à dos</h4>
        <div className="flex flex-row gap-4">
          <BackpackInventory
            backpack={character.inventory.backpack}
            storageCapacity={character.inventory.storageCapacity}
          />
        </div>
      </div>
    </>
  );
};
