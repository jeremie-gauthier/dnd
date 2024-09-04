import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { HeroClassType } from "@dnd/shared";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MouseEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import cleric from "../../../assets/classes/cleric.webp";
import sorcerer from "../../../assets/classes/sorcerer.webp";
import thief from "../../../assets/classes/thief.webp";
import warrior from "../../../assets/classes/warrior.webp";
import { useGameContext } from "../context/GameContext/useGameContext";
import { CharacterIdentity } from "./CharacterIdentity";
import { CharacterStats } from "./CharacterStats";
import { CharacterInventory } from "./character-inventory/CharacterInventory";

const CLASS_TO_IMG: Readonly<Record<HeroClassType, string>> = {
  CLERIC: cleric,
  WARRIOR: warrior,
  SORCERER: sorcerer,
  THIEF: thief,
} as const;

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const CharacterSheet = (props: Props) => {
  const { game, heroPlaying, gameActions } = useGameContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over?.data.current?.action || !active.data.current?.item.name) return;

    if (over.data.current.action === "delete_item") {
      gameActions.deleteItem({
        gameId: game.id,
        itemId: active.data.current.item.name,
      });
    } else if (over.data.current.action === "swap_item") {
      const destinationStorageSpace = over.data.current.storageSpace as
        | "gear"
        | "backpack";
      const isMovingItemsInSameStorageSpace = heroPlaying?.inventory[
        destinationStorageSpace
      ].some((item) => item.name === active.data.current?.item.name);
      if (isMovingItemsInSameStorageSpace) {
        return;
      }

      const [gearItem, backpackItem] =
        destinationStorageSpace === "gear"
          ? [over.data.current.hostedItem, active.data.current.item]
          : [active.data.current.item, over.data.current.hostedItem];
      if (gearItem && backpackItem && gearItem.type !== backpackItem.type) {
        return;
      }

      gameActions.swapItems({
        gameId: game.id,
        gearItemId: gearItem?.name,
        backpackItemId: backpackItem?.name,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <InnerCharacterSheet {...props} />
    </DndContext>
  );
};

const InnerCharacterSheet = ({ isOpen, close }: Props) => {
  // TODO: add missing translations
  const { t } = useTranslation(["inventory"]);
  const { heroPlaying, playerState } = useGameContext();
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-garbage-slot",
    data: { action: "delete_item" },
  });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const updateTooltipPosition: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isOver) {
      setTooltipPosition({
        top: event.clientY + 20,
        left: event.clientX + 20,
      });
    }
  };

  if (!heroPlaying || !playerState.canAct) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={close}
    >
      <div
        onMouseMove={updateTooltipPosition}
        ref={setNodeRef}
        className="fixed inset-0 z-20 w-screen overflow-y-auto"
      >
        {isOver ? (
          <div
            className="fixed z-[9999] rounded-md p-2 bg-red-400 font-semibold"
            style={tooltipPosition}
          >
            Supprimer cet objet ? (1PA)
            <br />
            <span className="font-normal italic">Relâchez pour confirmer</span>
          </div>
        ) : null}
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-max rounded-xl"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white text-center bg-[#3B3D58] bg-opacity-[95%] rounded-t-md"
            >
              {t("inventory_title", { ns: "inventory" })}
            </DialogTitle>

            {heroPlaying.faction === "hero" ? (
              <img
                src={CLASS_TO_IMG[heroPlaying.class]}
                alt=""
                className="absolute top-3 left-4 h-20 shadow-xl"
              />
            ) : null}

            <div className="flex flex-row rounded-xl">
              <div className="flex flex-col pt-20 px-1 pb-4 bg-[#3B3D58] rounded-bl-md gap-4">
                <CharacterStats character={heroPlaying} />
              </div>

              <div className="flex flex-col bg-[#1B1D31] rounded-br-md">
                <div className="flex flex-row bg-[#3B3D58] pl-4 py-2">
                  <CharacterIdentity character={heroPlaying} />
                </div>
                <div className="flex flex-col p-4 gap-8">
                  <CharacterInventory character={heroPlaying} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
