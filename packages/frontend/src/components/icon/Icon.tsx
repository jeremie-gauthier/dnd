import { iconMapping } from "./Icon.data";
import { IconName, IconSize } from "./Icon.type";

type Props = {
  icon: IconName;
  className?: string;
  size?: IconSize;
};

export const Icon = ({ icon, className, size }: Props) => {
  const BaseIcon = iconMapping[icon];

  return (
    <BaseIcon className={className} size={iconSizeMapping[size ?? "medium"]} />
  );
};

const iconSizeMapping: Readonly<Record<IconSize, number>> = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
};
