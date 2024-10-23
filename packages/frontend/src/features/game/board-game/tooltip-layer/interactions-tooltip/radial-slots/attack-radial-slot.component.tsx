import { useGameContext } from "@features/game/context/use-game-context";
import { Interaction } from "@features/game/game-engine/events/interactions-authorized.event";

type Props = {
  interaction: Extract<Interaction, { name: "attack" }> & {
    radius: number;
    x: number;
    y: number;
  };
};

export const AttackRadialSlot = ({ interaction }: Props) => {
  const { entityPlaying } = useGameContext();
  if (!entityPlaying) {
    return null;
  }

  const attackItem = entityPlaying.inventory.gear.find(
    (item) =>
      (item.type === "Weapon" || item.type === "Spell") &&
      item.attacks.some((attack) => attack.id === interaction.attack.id),
  );
  if (!attackItem) {
    return null;
  }
  const INTERACTION_IMG_SIZE = 42;
  const HALF_INTERACTION_IMG_SIZE = INTERACTION_IMG_SIZE / 2;

  return (
    <>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        height={INTERACTION_IMG_SIZE}
        width={INTERACTION_IMG_SIZE}
        x={interaction.x - HALF_INTERACTION_IMG_SIZE}
        y={interaction.y - HALF_INTERACTION_IMG_SIZE}
        focusable={false}
        style={{ flexShrink: 0 }}
        className="fill-white group-hover:fill-slate-700 overflow-hidden"
      >
        <image
          xlinkHref={attackItem.imgUrl}
          className="w-full h-full"
          x={0}
          y={0}
        />

        {interaction.attack.type === "super" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-yellow-500"
            height={128}
            width={128}
            x={INTERACTION_IMG_SIZE}
            y={0}
            focusable={false}
            style={{ flexShrink: 0 }}
            fill="currentColor"
          >
            <title>Super attack</title>
            <g>
              <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z" />
            </g>
          </svg>
        )}
      </svg>
    </>
  );
};
