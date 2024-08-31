import { IconProps } from "../Icon.type";

export const IconTrashCan = ({ className, size }: IconProps) => {
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
      <title>Trash Can</title>
      <g>
        <path d="M199 103v50h-78v30h270v-30h-78v-50H199zm18 18h78v32h-78v-32zm-79.002 80l30.106 286h175.794l30.104-286H137.998zm62.338 13.38l.64 8.98 16 224 .643 8.976-17.956 1.283-.64-8.98-16-224-.643-8.976 17.956-1.283zm111.328 0l17.955 1.284-.643 8.977-16 224-.64 8.98-17.956-1.284.643-8.977 16-224 .64-8.98zM247 215h18v242h-18V215z" />
      </g>
    </svg>
  );
};
