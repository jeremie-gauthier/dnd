import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../icon/Icon";
import { Button } from "../../../shared/button/Button";
import { CharacterSheet } from "../../character-sheet/CharacterSheet";

export const OpenInventoryButton = () => {
  const { t } = useTranslation(["inventory"]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const open = () => {
    setIsInventoryOpen(true);
  };

  const close = () => {
    setIsInventoryOpen(false);
  };

  return (
    <>
      <Button variant="primary" onClick={open}>
        <Icon icon="battleGear" className="fill-white h-10 w-10" />
      </Button>

      <Dialog
        open={isInventoryOpen}
        as="div"
        className="relative z-20 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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

              <CharacterSheet />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
