import { LockOpenIcon } from "@heroicons/react/20/solid";
import { Button } from "../../shared/button/Button";

type Params = {
  onClick: () => void;
  disabled: boolean;
};

export const OpenDoorButton = ({ onClick, disabled }: Params) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button variant="outlined" onClick={handleClick} disabled={disabled}>
      <div className="flex items-center">
        <LockOpenIcon className="h-5 w-5 text-yellow-400" />
        <span>Open the door</span>
      </div>
    </Button>
  );
};
