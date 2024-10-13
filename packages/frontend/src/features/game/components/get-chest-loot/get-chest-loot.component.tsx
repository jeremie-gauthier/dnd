import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { GameItem } from "@dnd/shared";
import { ItemFoundEvent } from "@features/game/game-engine/events/item-found.event";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/use-game-context";
import { CharacterSheet } from "../character-sheet/CharacterSheet";
import { BackpackSlot } from "./backpack-slot.component";
import { ChestLootContent } from "./chest-loot-content.component";
import { GearSlot } from "./gear-slot.component";
import { GetChestLootTooltip } from "./get-chest-loot-tooltip.component";
import {
  GetChestLootContextProvider,
  useGetChestLootContext,
} from "./get-chest-loot.context";

export const GetChestLoot = () => {
  const { game, gameActions, gameEventManager } = useGameContext();
  const [itemFoundInChest, setItemFoundInChest] = useState<GameItem | null>(
    null,
  );

  useEffect(() => {
    const handleItemFound: EventListener = (e) => {
      const { itemFound } = e as ItemFoundEvent;
      setItemFoundInChest(itemFound);
    };
    gameEventManager.addEventListener(
      ItemFoundEvent.EventName,
      handleItemFound,
    );

    return () => {
      gameEventManager.removeEventListener(
        ItemFoundEvent.EventName,
        handleItemFound,
      );
    };
  }, [gameEventManager.addEventListener, gameEventManager.removeEventListener]);

  const handleClose = () => {
    setItemFoundInChest(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over?.data.current?.action || !active.data.current?.item.name) {
      return;
    }

    const lootedItemType = active.data.current.item.type;
    const destinationSlotType = over.data.current.slotType;
    const destinationStorageSpace = over.data.current.storageSpace;
    if (
      destinationStorageSpace === "gear" &&
      lootedItemType !== destinationSlotType
    ) {
      return;
    }

    const lootedItemId = active.data.current.item.name;
    const replacedItemId = over.data.current.hostedItem?.name;

    if (
      over.data.current.action === "add_item" ||
      over.data.current.action === "swap_item"
    ) {
      gameActions.lootItem({
        gameId: game.id,
        itemId: lootedItemId,
        replacedItemId,
        storageSpace: over.data.current.storageSpace,
      });
      handleClose();
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GetChestLootContextProvider>
        <InnerGetChestLoot
          close={handleClose}
          itemFoundInChest={itemFoundInChest}
        />
      </GetChestLootContextProvider>
    </DndContext>
  );
};

type Props = {
  close: (clickedTarget?: "button") => void;
  itemFoundInChest: GameItem | null;
};

const InnerGetChestLoot = ({ close, itemFoundInChest }: Props) => {
  const { t } = useTranslation(["inventory"]);
  const { entityPlaying } = useGameContext();
  const { updateCursorPosition } = useGetChestLootContext();

  const noOp = () => {};
  const onRefuseLoot = () => {
    close();
  };

  if (!entityPlaying || !itemFoundInChest) {
    return null;
  }

  return (
    <Dialog
      open={itemFoundInChest !== null}
      as="div"
      className="relative z-40 focus:outline-none"
      onClose={noOp}
      onMouseMove={updateCursorPosition}
    >
      <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
        <GetChestLootTooltip />

        <div className="flex min-h-full items-center justify-center p-4 gap-8">
          <DialogPanel className="relative flex flex-row w-full max-w-max rounded-xl gap-4">
            <div className="relative w-full max-w-max rounded-xl">
              <DialogTitle
                as="h3"
                className="relative text-base/7 font-medium text-white text-center t bg-primary-600 bg-opacity-[95%] rounded-t-md"
              >
                {t("chest", { ns: "inventory" })}
              </DialogTitle>

              <ChestLootContent
                item={itemFoundInChest}
                onRefuseLoot={onRefuseLoot}
              />
            </div>

            <div className="relative w-full max-w-max rounded-xl">
              <DialogTitle
                as="h3"
                className="relative text-base/7 font-medium text-white text-center t bg-primary-600 bg-opacity-[95%] rounded-t-md"
              >
                {t("inventory_title", { ns: "inventory" })}
              </DialogTitle>

              <CharacterSheet
                character={entityPlaying}
                renderBackpackSlot={BackpackSlot}
                renderGearSlot={GearSlot}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
