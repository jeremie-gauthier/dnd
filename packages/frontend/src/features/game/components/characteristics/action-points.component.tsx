import { Icon } from "@features/ui/icon/Icon";

type Props = {
  actionPoints: number;
};

export const ActionPoints = ({ actionPoints }: Props) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-200 border border-yellow-600">
        <Icon
          icon="roundStar"
          className="h-12 w-12 fill-yellow-600 opacity-60"
        />
      </div>
      <span className="absolute text-2xl font-bold">{actionPoints}</span>
    </div>
  );
};
