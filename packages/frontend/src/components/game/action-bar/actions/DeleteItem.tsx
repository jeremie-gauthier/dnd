import { GameItem } from "@dnd/shared";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../icon/Icon";
import { Button } from "../../../shared/button/Button";
import { useGameContext } from "../../context/GameContext/useGameContext";

type Props = {
  item: GameItem;
};

export const DeleteItem = ({ item }: Props) => {
  const { t } = useTranslation(["common", "items", "inventory"]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { game, gameActions } = useGameContext();

  const open = () => {
    setIsConfirmationModalOpen(true);
  };

  const close = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleItemDeletion = () => {
    gameActions.deleteItem({ gameId: game.id, itemId: item.name });
    close();
  };

  return (
    <>
      <button type="button" onClick={open}>
        <Icon icon="trashCan" size="xlarge" className="hover:cursor-pointer" />
      </button>

      <Dialog
        open={isConfirmationModalOpen}
        as="div"
        className="relative z-20 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-xl"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-amber-800"
              >
                {t("confirm_deletion_title", { ns: "inventory" })}
              </DialogTitle>

              <p className="mt-2 text-sm/6 text-white">
                {t("confirm_deletion_description", {
                  itemName: t(item.name, { ns: "items" }),
                  ns: "inventory",
                })}
              </p>

              <div className="mt-4 flex flex-row flex-1 justify-end gap-4">
                <Button variant="outlined" onClick={close}>
                  {t("cancel", { ns: "common" })}
                </Button>
                <Button variant="primary" onClick={handleItemDeletion}>
                  {t("confirm", { ns: "common" })}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
