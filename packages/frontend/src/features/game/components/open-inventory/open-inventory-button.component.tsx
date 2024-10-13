import { Button } from "@features/ui/button/button";
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
      <Button variant="darkPrimary" onClick={open}>
        <Icon
          icon="battleGear"
          className="fill-primary-600 group-hover:fill-primary-200 h-10 w-10"
        />
      </Button>

      <EditCharacterInventory isOpen={isInventoryOpen} close={close} />
    </>
  );
};
