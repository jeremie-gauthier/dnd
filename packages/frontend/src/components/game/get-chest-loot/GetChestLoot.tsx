import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { GameItem } from "@dnd/shared";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { CharacterSheet } from "../common/character-sheet/CharacterSheet";
import { useGameContext } from "../context/GameContext/useGameContext";
import { BackpackSlot } from "./BackpackSlot";
import { ChestLootContent } from "./ChestLootContent";
import { GearSlot } from "./GearSlot";
import {
  GetChestLootContextProvider,
  useGetChestLootContext,
} from "./GetChestLootContext";
import { GetChestLootTooltip } from "./GetChestLootTooltip";

type Props = {
  isOpen: boolean;
  close: (clickedTarget?: "button") => void;
  itemFoundInChest: GameItem | null;
};

export const GetChestLoot = (props: Props) => {
  const { game, gameActions } = useGameContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over?.data.current?.action || !active.data.current?.item.name) {
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
      props.close();
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GetChestLootContextProvider>
        <InnerGetChestLoot {...props} />
      </GetChestLootContextProvider>
    </DndContext>
  );
};

const InnerGetChestLoot = ({
  isOpen,
  close,
  itemFoundInChest,
}: Pick<Props, "close" | "isOpen" | "itemFoundInChest">) => {
  const { t } = useTranslation(["inventory"]);
  const { heroPlaying } = useGameContext();
  const { updateCursorPosition } = useGetChestLootContext();

  const noOp = () => {};
  const onRefuseLoot = () => {
    close();
  };

  if (!heroPlaying || !itemFoundInChest) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={noOp}
      onMouseMove={updateCursorPosition}
    >
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
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
                character={heroPlaying}
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
