import { IconProps } from "../Icon.type";

export const IconChevronUpDown = ({ className, size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      stroke="currentColor"
      className={className}
      focusable={false}
      style={{ flexShrink: 0 }}
    >
      <title>Chevron Up Down</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
};
