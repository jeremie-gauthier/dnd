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
          {data.diceRollResults.map(({ color, name, result }, idx) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              style={{
                backgroundColor: color,
                color: ["special", "red"].includes(name) ? "#fff" : undefined,
              }}
              className="font-semibold border rounded flex items-center justify-center w-6 h-6"
            >
              {result}
            </span>
          ))}
        </div>
      ) : null}
    </li>
  );
};
