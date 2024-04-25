import { PauseCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../../shared/button/Button";

type Params = {
  onClick: () => void;
};

export const EndTurnButton = ({ onClick }: Params) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button variant="outlined" onClick={handleClick}>
      <div className="flex items-center">
        <PauseCircleIcon className="h-5 w-5 text-orange-500" />
        <span>End Turn</span>
      </div>
    </Button>
  );
};
