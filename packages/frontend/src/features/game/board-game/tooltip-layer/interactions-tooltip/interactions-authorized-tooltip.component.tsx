import { useGameContext } from "@features/game/context/use-game-context";
import { Interaction } from "@features/game/game-engine/events/interactions-authorized.event";
import { RadialSlot } from "./radial-slots/radial-slot.component";

export const InteractionsAuthorizedTooltip = ({
  radiusRing,
  x,
  y,
  interactions,
}: {
  radiusRing: number;
  x: number;
  y: number;
  interactions: Array<Interaction & { radius: number; x: number; y: number }>;
}) => {
  const { assetSize } = useGameContext();

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle
        r={radiusRing}
        cx={x}
        cy={y}
        className="fill-transparent stroke-slate-700 stroke-2"
      />
      {interactions.map((interaction, idx) => {
        return (
          <g
            key={`interaction-${interaction.name}-${idx}`}
            className="group"
            onMouseUp={() => interaction.onInteract()}
          >
            <circle
              r={assetSize / 2}
              cx={interaction.x}
              cy={interaction.y}
              className="fill-slate-700 stroke-2 stroke-slate-700 group-hover:fill-white"
            />
            <RadialSlot interaction={interaction} />
          </g>
        );
      })}
    </svg>
  );
};
