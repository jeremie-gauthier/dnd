import { IconProps } from "../Icon.type";

export const IconOpenGate = ({ className, size }: IconProps) => {
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
      <title>Open Gate</title>
      <g>
        <path d="M192 64c-15.4 3.77-35.7 16.04-53 33.17-19.2 19.13-34.9 43.63-39.58 64.63l-.58 135.3.37 157.4 93.99-40.3L192 64zm128 0l-1.2 350.2 94 40.3.4-156.8-.6-135.9c-4.7-21-20.3-45.5-39.6-64.63-17.3-17.13-37.6-29.4-53-33.17zM57.24 94.67c-8.39 0-15 6.63-15 15.03 0 8.4 6.61 15 15 15s15-6.6 15-15-6.61-15.03-15-15.03zm397.56 0c-8.4 0-15 6.63-15 15.03 0 8.4 6.6 15 15 15s15-6.6 15-15-6.6-15.03-15-15.03zM35.5 142.7l-1.42 334h46l1.42-334h-46zm395 0l1.5 334h46l-1.5-334h-46zM159.2 231h18v48h-18v-48zm175.6 0h18v48h-18v-48z" />
      </g>
    </svg>
  );
};
