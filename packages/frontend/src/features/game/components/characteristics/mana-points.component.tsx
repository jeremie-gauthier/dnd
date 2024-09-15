import { Icon } from "@features/ui";

type Props = {
  manaPoints: number;
  baseManaPoints: number;
};

export const ManaPoints = ({ manaPoints, baseManaPoints }: Props) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-200 border border-sky-600">
        <Icon
          icon="wizardStaff"
          className="h-12 w-12 fill-blue-600 opacity-60"
        />
      </div>
      <span className="absolute text-2xl font-bold">
        {manaPoints}
        <span className="text-sm font-bold">/ {baseManaPoints}</span>
      </span>
    </div>
  );
};
