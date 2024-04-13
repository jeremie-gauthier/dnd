import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Button } from "../../shared/button/Button";

type Params = {
  onClick: () => void;
  onCancel: () => void;
};

export const MoveButton = ({ onClick, onCancel }: Params) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (isActive) {
      onCancel();
    } else {
      onClick();
    }
    setIsActive((prevValue) => !prevValue);
  };

  return (
    <Button variant="outlined" onClick={handleClick}>
      <div className="flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 text-green-500" />
        <span>{isActive ? "Cancel Move" : "Move"}</span>
      </div>
    </Button>
  );
};
