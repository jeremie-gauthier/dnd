import { Button, Icon } from "@features/ui";
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
      <Button variant="primary" onClick={open}>
        <Icon icon="battleGear" className="fill-white h-10 w-10" />
      </Button>

      <EditCharacterInventory isOpen={isInventoryOpen} close={close} />
    </>
  );
};
