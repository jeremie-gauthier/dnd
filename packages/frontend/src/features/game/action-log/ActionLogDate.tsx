import { GameLog } from "@dnd/shared";

export const ActionLogDate = ({ createdAt }: Pick<GameLog, "createdAt">) => {
  const dateFormatter = (date: Date) =>
    new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

  return <span className="font-bold">[{dateFormatter(createdAt)}]</span>;
};
