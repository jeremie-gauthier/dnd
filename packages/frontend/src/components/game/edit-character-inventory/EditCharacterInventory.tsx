import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IconX } from "../../icon/icons/IconX";
import { CharacterSheet } from "../common/character-sheet/CharacterSheet";
import { useGameContext } from "../context/GameContext/useGameContext";
import { BackpackSlot } from "./BackpackSlot";
import {
  EditCharacterInventoryContextProvider,
  useEditCharacterInventoryContext,
} from "./EditCharacterInventoryContext";
import { EditCharacterInventoryTooltip } from "./EditCharacterInventoryTooltip";
import { GearSlot } from "./GearSlot";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const EditCharacterInventory = (props: Props) => {
  const { game, heroPlaying, gameActions } = useGameContext();
  const { setTooltipType } = useEditCharacterInventoryContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over?.data.current?.action || !active.data.current?.item.name) {
      setTooltipType(null);
      return;
    }

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
        setTooltipType(null);
        return;
      }

      const [gearItem, backpackItem] =
        destinationStorageSpace === "gear"
          ? [over.data.current.hostedItem, active.data.current.item]
          : [active.data.current.item, over.data.current.hostedItem];
      if (gearItem && backpackItem && gearItem.type !== backpackItem.type) {
        setTooltipType(null);
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
      <EditCharacterInventoryContextProvider>
        <InnerEditCharacterInventory {...props} />
      </EditCharacterInventoryContextProvider>
    </DndContext>
  );
};

const InnerEditCharacterInventory = ({ isOpen, close }: Props) => {
  const { t } = useTranslation(["inventory"]);
  const { heroPlaying, playerState } = useGameContext();
  const { isOver: isOverGarbageArea, setNodeRef: setGarbageAreaNodeRed } =
    useDroppable({
      id: "droppable-garbage-slot",
      data: { action: "delete_item" },
    });
  const { isOver: isOverSafeArea, setNodeRef: setSafeAreaNodeRef } =
    useDroppable({
      id: "droppable-safe-area",
    });
  const { updateCursorPosition, setTooltipType } =
    useEditCharacterInventoryContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: setTooltipType is a react hook
  useEffect(() => {
    if (isOverSafeArea) {
      setTooltipType(null);
    }

    if (isOverGarbageArea) {
      setTooltipType("confirm_delete");
    }
  }, [isOverGarbageArea, isOverSafeArea]);

  if (!heroPlaying || !playerState.canAct) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={close}
      onMouseMove={updateCursorPosition}
    >
      <div
        ref={setGarbageAreaNodeRed}
        className="fixed inset-0 z-20 w-screen overflow-y-auto"
      >
        <EditCharacterInventoryTooltip />
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="relative w-full max-w-max rounded-xl"
            ref={setSafeAreaNodeRef}
          >
            <DialogTitle
              as="h3"
              className="relative text-base/7 font-medium text-white text-center t bg-primary-600 bg-opacity-[95%] rounded-t-md"
            >
              {t("inventory_title", { ns: "inventory" })}

              <button
                type="button"
                className="absolute right-1 top-0"
                onClick={close}
              >
                <IconX className="stroke-white h-6 w-6" />
              </button>
            </DialogTitle>

            <CharacterSheet
              character={heroPlaying}
              renderBackpackSlot={BackpackSlot}
              renderGearSlot={GearSlot}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};