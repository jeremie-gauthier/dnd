import { GameLog } from "@dnd/shared";
import { useTranslation } from "react-i18next";
import { ActionLogItemDate } from "./action-log-item-date.component";

type Props = GameLog;

export const ActionLogItem = ({ createdAt, data, type }: Props) => {
  const { t } = useTranslation(["action-log", "items"]);

  const hasDiceRollResults = type === "game.update.playable_entity_attacked";

  return (
    <li className="space-x-1">
      <ActionLogItemDate createdAt={createdAt} />
      <span>{t(type, data)}</span>

      {hasDiceRollResults ? (
        <div className="rounded flex w-max gap-2 px-2">
          {data.diceRollResults.map(({ name, result }, idx) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              className={`font-semibold rounded flex items-center justify-center w-6 h-6 ${getDiceClass[name]}`}
            >
              {result}
            </span>
          ))}
        </div>
      ) : null}
    </li>
  );
};

const getDiceClass: Record<string, string> = {
  yellow: "bg-dice-yellow text-black",
  orange: "bg-dice-orange text-black",
  red: "bg-dice-red text-white",
  purple: "bg-dice-purple text-black",
  special: "bg-dice-special text-white",
  "disarm-trap": "bg-dice-disarm-trap text-white",
  "detect-trap": "bg-dice-detect-trap text-white",
  "turn-undead": "bg-dice-turn-undead text-white",
};
