import { GameEntity } from "@dnd/shared";

type Props = {
  game: GameEntity;
};

export const Game = ({ game }: Props) => {
  return (
    <div>
      <p>Game ID: {game.id}</p>
    </div>
  );
};
