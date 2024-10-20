import cleric from "@assets/classes/cleric.webp";
import sorcerer from "@assets/classes/sorcerer.webp";
import thief from "@assets/classes/thief.webp";
import warrior from "@assets/classes/warrior.webp";
import { GameItem, HeroClassType, PlayableEntity } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/use-game-context";
import { ActionPoints } from "../characteristics/action-points.component";
import { ArmourPoints } from "../characteristics/armour-points.component";
import { HealthPoints } from "../characteristics/health-points.component";
import { ManaPoints } from "../characteristics/mana-points.component";
import { MovementPoints } from "../characteristics/movement-points.component";
import { BackpackInventory } from "./BackpackInventory";
import { CharacterIdentity } from "./CharacterIdentity";
import { GearInventory } from "./GearInventory";

type Props = {
  character: PlayableEntity;
  renderBackpackSlot: React.FC<{
    item?: GameItem;
    type: "Weapon" | "Spell" | "Artifact" | "Potion" | "backpackAnyItem";
    idx: number;
  }>;
  renderGearSlot: React.FC<{
    item?: GameItem;
    type: "Weapon" | "Spell" | "Artifact";
    idx: number;
  }>;
};

export const CharacterSheet = ({
  character,
  renderBackpackSlot,
  renderGearSlot,
}: Props) => {
  const { t } = useTranslation(["inventory"]);
  const { entityPlaying, playerState } = useGameContext();

  if (!entityPlaying || !playerState.canAct) {
    return null;
  }

  return (
    <>
      {entityPlaying.faction === "hero" ? (
        <img
          src={CLASS_TO_IMG[entityPlaying.class]}
          alt=""
          className="absolute top-3 left-4 h-20 shadow-xl"
        />
      ) : null}

      <div className="flex flex-row rounded-xl">
        <div className="flex flex-col pt-20 px-1 pb-4 bg-slate-500 rounded-bl-md gap-4">
          <HealthPoints
            healthPoints={entityPlaying.characteristic.healthPoints}
            baseHealthPoints={entityPlaying.characteristic.baseHealthPoints}
            size="medium"
          />
          <ManaPoints
            manaPoints={entityPlaying.characteristic.manaPoints}
            baseManaPoints={entityPlaying.characteristic.baseManaPoints}
          />
          <ArmourPoints armorClass={entityPlaying.characteristic.armorClass} />
          <ActionPoints
            actionPoints={entityPlaying.characteristic.actionPoints}
          />
          <MovementPoints
            movementPoints={entityPlaying.characteristic.movementPoints}
          />
        </div>

        <div className="flex flex-col bg-slate-800 rounded-br-md">
          <div className="flex flex-row bg-slate-500 pl-4 py-2">
            <CharacterIdentity character={entityPlaying} />
          </div>
          <div className="flex flex-col p-4 gap-8">
            <div className="flex flex-col">
              <h4 className="text-white text-lg">{t("gear")}</h4>
              <div className="flex flex-row gap-4">
                <GearInventory
                  gear={character.inventory.gear}
                  storageCapacity={character.inventory.storageCapacity}
                  renderGearSlot={renderGearSlot}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="text-white text-lg">{t("backpack")}</h4>
              <div className="flex flex-row gap-4 min-w-[26rem]">
                <BackpackInventory
                  backpack={character.inventory.backpack}
                  storageCapacity={character.inventory.storageCapacity}
                  renderBackpackSlot={renderBackpackSlot}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CLASS_TO_IMG: Readonly<Record<HeroClassType, string>> = {
  CLERIC: cleric,
  WARRIOR: warrior,
  SORCERER: sorcerer,
  THIEF: thief,
} as const;
