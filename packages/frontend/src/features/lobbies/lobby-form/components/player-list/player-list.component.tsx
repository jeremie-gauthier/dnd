import clsx from "clsx";
import { PlayerItem } from "./player-item.component";

type Props = {
  players: Array<{
    userId: string;
    heroesSelected: Array<string>;
    isReady: boolean;
    isHost: boolean;
  }>;
  nbPlayersMax: number;
};

export const PlayerList = ({ players, nbPlayersMax }: Props) => {
  const isFull = players.length >= nbPlayersMax;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-baseline justify-between">
        <h2>Players</h2>
        <span
          className={clsx("text-sm font-semibold", { "text-red-600": isFull })}
        >
          {players.length} / {nbPlayersMax}
        </span>
      </div>
      <ul className="flex flex-col gap-4">
        {players.map((player) => (
          <PlayerItem key={player.userId} player={player} />
        ))}
      </ul>
    </div>
  );
};
