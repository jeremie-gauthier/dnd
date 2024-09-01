import { classNames } from "../../utils/class-names.util";
import { useGameContext } from "./context/GameContext/useGameContext";

type Props = {
  size?: "small" | "medium" | "large";
};

export const HealthPoints = ({ size = "medium" }: Props) => {
  const { isPlaying, heroPlaying } = useGameContext();

  if (!isPlaying || !heroPlaying) {
    return null;
  }

  const healthPointsMissingPercentage = Math.round(
    ((heroPlaying.characteristic.baseHealthPoints -
      heroPlaying.characteristic.healthPoints) /
      heroPlaying.characteristic.baseHealthPoints) *
      100,
  );
  const svgSize = classNames(
    size === "small" ? "h-12 w-12" : "",
    size === "medium" ? "h-20 w-20" : "",
    size === "large" ? "h-32 w-32" : "",
  );
  const fontSize = classNames(
    size === "small" ? "text-xs" : "",
    size === "medium" ? "text-lg" : "",
    size === "large" ? "text-2xl" : "",
  );

  return (
    <div className="relative flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={classNames("stroke-red-800 stroke-[1rem]", svgSize)}
        focusable={false}
        style={{ flexShrink: 0 }}
        fill="currentColor"
      >
        <title>Heart</title>

        <linearGradient
          id="lifeRemainingGradient"
          gradientTransform="rotate(90)"
        >
          <stop
            offset={`${healthPointsMissingPercentage}%`}
            stopColor="#fca5a5"
          />
          <stop
            offset={`${healthPointsMissingPercentage}%`}
            stopColor="#dc2626"
          />
        </linearGradient>

        <g>
          <path
            fill="url(#lifeRemainingGradient)"
            d="M480.25 156.355c0 161.24-224.25 324.43-224.25 324.43S31.75 317.595 31.75 156.355c0-91.41 70.63-125.13 107.77-125.13 77.65 0 116.48 65.72 116.48 65.72s38.83-65.73 116.48-65.73c37.14.01 107.77 33.72 107.77 125.14z"
          />
        </g>
      </svg>

      <span className={classNames("absolute font-bold", fontSize)}>
        {heroPlaying.characteristic.healthPoints} /{" "}
        {heroPlaying.characteristic.baseHealthPoints}
      </span>
    </div>
  );
};
