import { IconProps } from "../Icon.type";

export const IconShield = ({ className, size }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      height={size}
      width={size}
      focusable={false}
      style={{ flexShrink: 0 }}
      fill="currentColor"
    >
      <title>Shield</title>
      <g>
        <path d="M256 16c25 24 100 72 150 72v96c0 96-75 240-150 312-75-72-150-216-150-312V88c50 0 125-48 150-72z" />
      </g>
    </svg>
  );
};
