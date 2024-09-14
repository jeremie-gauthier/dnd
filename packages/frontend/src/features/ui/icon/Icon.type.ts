import { iconMapping } from "./Icon.data";

export type IconProps = {
  className?: string;
  size?: number;
};

export type IconSize = "small" | "medium" | "large" | "xlarge";

export type IconName = keyof typeof iconMapping;
