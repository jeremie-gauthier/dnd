import { useGameContext } from "./context/useGameContext";

export const HealthPoints = () => {
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

  return (
    <div className="relative flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="h-32 w-32 stroke-red-800 stroke-[1rem]"
        focusable={false}
        style={{ flexShrink: 0 }}
        fill="currentColor"
      >
        <title>Heart</title>

        <linearGradient
          id="lifeRemainingGradient"
          gradientTransform="rotate(90)"
        >
          <stop offset={`${healthPointsMissingPercentage}%`} stopColor="#fff" />
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

      <span className="absolute text-2xl font-bold">
        {heroPlaying.characteristic.healthPoints} /{" "}
        {heroPlaying.characteristic.baseHealthPoints}
      </span>
    </div>
  );
};
