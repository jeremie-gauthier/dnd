import { useGameContext } from "@features/game/context/use-game-context";
import { ActionLogItem } from "./action-log-item.component";

export const ActionsLog = () => {
  const { actionsLogs } = useGameContext();

  return (
    <ul className="absolute bottom-4 left-4 flex flex-col-reverse h-32 w-96 overflow-y-scroll rounded-sm px-1 bg-primary-600 text-white">
      {actionsLogs.map((actionLog, idx) => (
        <ActionLogItem
          key={`${actionLog.type}:${actionLog.createdAt.valueOf()}:${idx}`}
          {...actionLog}
        />
      ))}
    </ul>
  );
};
