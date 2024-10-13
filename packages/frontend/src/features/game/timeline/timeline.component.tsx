import { GameView } from "@dnd/shared";
import { classNames } from "@utils/class-names.util";

type Props = {
  game: GameView;
};

export const Timeline = ({ game }: Props) => {
  return (
    <ul className="flex flex-row gap-2">
      {game.timeline.map((playableEntityId) => {
        const playableEntity = game.playableEntities[playableEntityId];
        if (!playableEntity) {
          return null;
        }

        return (
          <li
            key={playableEntity.id}
            className={classNames(
              "border rounded-lg px-2 border-amber-800 min-w-fit",
              playableEntity.currentPhase === "action"
                ? "bg-amber-800"
                : "bg-transparent",
              playableEntity.characteristic.healthPoints === 0
                ? "grayscale text-gray-500"
                : "text-white",
            )}
          >
            {playableEntity.name}
          </li>
        );
      })}
    </ul>
  );
};
