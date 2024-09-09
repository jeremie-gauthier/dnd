import { useState } from "react";
import { Icon } from "../../../icon/Icon";
import { Button } from "../../../shared/button/Button";
import { EditCharacterInventory } from "../../edit-character-inventory/EditCharacterInventory";

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
