import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../../shared/button/Button";

type Params = {
  onClick: () => void;
  onCancel: () => void;
  isMoving: boolean;
  disabled: boolean;
};

export const MoveButton = ({
  onClick,
  onCancel,
  isMoving,
  disabled,
}: Params) => {
  const handleClick = () => {
    if (isMoving) {
      onCancel();
    } else {
      onClick();
    }
  };

  return (
    <Button variant="outlined" onClick={handleClick} disabled={disabled}>
      <div className="flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 text-green-500" />
        <span>{isMoving ? "Cancel Move" : "Move"}</span>
      </div>
    </Button>
  );
};
