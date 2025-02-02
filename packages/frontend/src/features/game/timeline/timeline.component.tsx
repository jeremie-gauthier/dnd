import { GameResponseDto } from "@/openapi/dnd-api";
import { cn } from "@lib/utils";

type Props = {
  game: GameResponseDto;
};

export const Timeline = ({ game }: Props) => {
  return (
    <ul className="flex flex-row gap-2">
      {game.timeline.map((playableEntityId) => {
        const playableEntity = game.playableEntities.find(
          (playableEntity) => playableEntity.id === playableEntityId,
        );
        if (!playableEntity) {
          return null;
        }

        return (
          <li
            key={playableEntity.id}
            className={cn(
              "border rounded-lg px-2 border-slate-600 min-w-fit",
              playableEntity.currentPhase === "action"
                ? "bg-slate-600 text-slate-900"
                : "bg-transparent",
              playableEntity.characteristic.healthPoints === 0
                ? "grayscale text-gray-500"
                : "text-slate-100",
            )}
          >
            {playableEntity.name}
          </li>
        );
      })}
    </ul>
  );
};
