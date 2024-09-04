import { PlayableEntity } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import { BackpackInventory } from "./BackpackInventory";
import { GearInventory } from "./GearInventory";

type Props = {
  character: PlayableEntity;
};

export const CharacterInventory = ({ character }: Props) => {
  const { t } = useTranslation(["inventory"]);

  return (
    <>
      <div className="flex flex-col">
        <h4 className="text-white text-lg">{t("gear")}</h4>
        <div className="flex flex-row gap-4">
          <GearInventory
            gear={character.inventory.gear}
            storageCapacity={character.inventory.storageCapacity}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-white text-lg">{t("backpack")}</h4>
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
