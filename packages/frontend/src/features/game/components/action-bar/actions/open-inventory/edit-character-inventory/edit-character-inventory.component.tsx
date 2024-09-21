import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Icon } from "@features/ui/icon/Icon";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../../../../../game/context/use-game-context";
import { CharacterSheet } from "../../../../character-sheet/CharacterSheet";
import { BackpackSlot } from "./backpack-slot.component";
import { EditCharacterInventoryTooltip } from "./edit-character-inventory-tooltip.component";
import {
  EditCharacterInventoryContextProvider,
  useEditCharacterInventoryContext,
} from "./edit-character-inventory.context";
import { GearSlot } from "./gear-slot.component";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const EditCharacterInventory = (props: Props) => {
  const { game, entityPlaying, gameActions } = useGameContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over?.data.current?.action || !active.data.current?.item.name) {
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
      const isMovingItemsInSameStorageSpace = entityPlaying?.inventory[
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
      <EditCharacterInventoryContextProvider>
        <InnerEditCharacterInventory {...props} />
      </EditCharacterInventoryContextProvider>
    </DndContext>
  );
};

const InnerEditCharacterInventory = ({ isOpen, close }: Props) => {
  const { t } = useTranslation(["inventory"]);
  const { entityPlaying, playerState } = useGameContext();
  const { isOver: isOverGarbageArea, setNodeRef: setGarbageAreaNodeRed } =
    useDroppable({
      id: "droppable-garbage-slot",
      data: { action: "delete_item" },
    });
  const {
    isOver: isOverSafeArea,
    setNodeRef: setSafeAreaNodeRef,
    active,
  } = useDroppable({
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: setTooltipType is a react hook
  useEffect(() => {
    if (!active) {
      setTooltipType(null);
    }
  }, [active]);

  if (!entityPlaying || !playerState.canAct) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-40 focus:outline-none"
      onClose={close}
      onMouseMove={updateCursorPosition}
    >
      <div
        ref={setGarbageAreaNodeRed}
        className="fixed inset-0 z-40 w-screen overflow-y-auto"
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
                <Icon icon="x" className="stroke-white h-6 w-6" />
              </button>
            </DialogTitle>

            <CharacterSheet
              character={entityPlaying}
              renderBackpackSlot={BackpackSlot}
              renderGearSlot={GearSlot}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
