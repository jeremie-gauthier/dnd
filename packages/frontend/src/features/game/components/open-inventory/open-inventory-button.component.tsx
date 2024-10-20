import { Button } from "@/components/ui/button";
import { Icon } from "@features/ui/icon/Icon";
import { useState } from "react";
import { EditCharacterInventory } from "./edit-character-inventory/edit-character-inventory.component";

export const OpenInventoryButton = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const open = () => {
    setIsInventoryOpen(true);
  };

  const close = () => {
    setIsInventoryOpen(false);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={open}
        className="size-14 p-0 [&_svg]:size-10"
      >
        <Icon
          icon="battleGear"
          className="fill-slate-500 group-hover:fill-slate-200"
        />
      </Button>

      <EditCharacterInventory isOpen={isInventoryOpen} close={close} />
    </>
  );
};
